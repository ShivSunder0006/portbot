import os
import pickle
import re
import json
import numpy as np
import pandas as pd
from typing import List, Dict, Tuple, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import torch
import requests
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


# ===================== Config =====================
DATA_PATH = os.getenv("DATA_PATH", "data/qa.csv")
INDEX_PATH = os.getenv("INDEX_PATH", "data/embed_index.pkl")

EMB_MODEL_NAME = os.getenv("EMB_MODEL_NAME", "intfloat/e5-large-v2")
TOP_K = int(os.getenv("TOP_K", "3"))
SIM_THRESHOLD = float(os.getenv("SIM_THRESHOLD", "0.35"))
USE_GENERATOR = os.getenv("USE_GENERATOR", "true").lower() == "true"

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
print(f"[INFO] Using device: {DEVICE}")

# Weather
WEATHER_API_KEY = os.getenv("7f29433d5ab2e3508ee458f09ea54cc7")
WEATHER_CITY = os.getenv("CITY", "Bengaluru")
WEATHER_UNITS = os.getenv("WEATHER_UNITS", "metric")

# ===================== FastAPI =====================
app = FastAPI(title="Shiv’s Portfolio Chatbot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"]
)

class ChatIn(BaseModel):
    message: str

class ChatOut(BaseModel):
    answer: str
    source: Dict

# ===================== Data / Index =====================
def load_csv(path: str) -> pd.DataFrame:
    if not os.path.exists(path):
        raise FileNotFoundError(f"CSV not found at {path}")

    df = pd.read_csv(path, comment="#", keep_default_na=True)
    df.columns = [c.strip().lower() for c in df.columns]

    if "question" not in df.columns or "answer" not in df.columns:
        raise ValueError("CSV must have 'question' and 'answer' columns.")

    df["question"] = df["question"].astype(str).str.strip().replace({"nan": ""})
    df["answer"] = df["answer"].astype(str).str.strip().replace({"nan": ""})
    df = df[(df["question"] != "") & (df["answer"] != "")]
    df = df.drop_duplicates(subset=["question"], keep="first").reset_index(drop=True)
    return df[["question", "answer"]]

def build_index(df: pd.DataFrame, model_name: str, device: str):
    model = SentenceTransformer(model_name, device=device)
    q_texts = [f"query: {q}" for q in df["question"].tolist()]
    q_emb = model.encode(q_texts, normalize_embeddings=True, show_progress_bar=True, device=device)
    meta = {"questions": df["question"].tolist(), "answers": df["answer"].tolist()}
    with open(INDEX_PATH, "wb") as f:
        pickle.dump({"embeddings": q_emb, "meta": meta, "model": model_name}, f)
    return q_emb, meta

def load_index():
    if not os.path.exists(INDEX_PATH):
        df = load_csv(DATA_PATH)
        return build_index(df, EMB_MODEL_NAME, DEVICE)
    with open(INDEX_PATH, "rb") as f:
        data = pickle.load(f)
    if data.get("model") != EMB_MODEL_NAME:
        df = load_csv(DATA_PATH)
        return build_index(df, EMB_MODEL_NAME, DEVICE)
    return data["embeddings"], data["meta"]

embeddings, meta = load_index()
embed_model = SentenceTransformer(EMB_MODEL_NAME, device=DEVICE)

def encode_query(text: str) -> np.ndarray:
    return embed_model.encode([f"query: {text.strip()}"], normalize_embeddings=True, device=DEVICE)

# ===================== Generator =====================
generator = None
gen_type = None

if USE_GENERATOR:
    from transformers import pipeline
    try:
        GEN_MODEL_NAME = os.getenv("GEN_MODEL_NAME", "Qwen/Qwen2.5-0.5B-Instruct")
        print(f"[INFO] Loading generator: {GEN_MODEL_NAME}")
        generator = pipeline(
            "text-generation",
            model=GEN_MODEL_NAME,
            device_map="auto",
            dtype=torch.float16 if torch.cuda.is_available() else torch.float32
        )
        gen_type = "text-generation"
    except Exception as e:
        print(f"[WARN] Qwen failed: {e}")
        print("[INFO] Falling back to Flan-T5-Base...")
        try:
            GEN_MODEL_NAME = "google/flan-t5-base"
            generator = pipeline(
                "text2text-generation",
                model=GEN_MODEL_NAME,
                device_map="auto",
                dtype=torch.float16 if torch.cuda.is_available() else torch.float32
            )
            gen_type = "text2text-generation"
        except Exception as e2:
            print(f"[ERROR] Could not load fallback: {e2}")

# ===================== Utils =====================
def top_k_context(query: str, k: int = TOP_K):
    q_emb = encode_query(query)
    sims = cosine_similarity(q_emb, embeddings)[0]
    idxs = np.argsort(sims)[::-1][:k]
    return [(meta["questions"][i], meta["answers"][i], float(sims[i])) for i in idxs]

def call_generator(system_prompt: str, user_prompt: str, max_new_tokens: int = 200) -> str:
    if not generator:
        return ""
    try:
        if gen_type == "text-generation":
            prompt = f"{system_prompt}\n\nUser: {user_prompt}\nAssistant:"
            out = generator(prompt, max_new_tokens=max_new_tokens, do_sample=False)
            if not out or "generated_text" not in out[0]:
                return ""
            return out[0]["generated_text"].split("Assistant:", 1)[-1].strip()
        elif gen_type == "text2text-generation":
            prompt = f"{system_prompt}\n\n{user_prompt}"
            out = generator(prompt, max_new_tokens=max_new_tokens)
            if not out or "generated_text" not in out[0]:
                return ""
            return out[0]["generated_text"].strip()
    except Exception as e:
        print(f"[ERROR] Generator failed: {e}")
    return ""

def get_weather_text() -> str:
    if not WEATHER_API_KEY:
        return f"I’m currently in {WEATHER_CITY}. For live updates, set WEATHER_API_KEY."
    try:
        url = "https://api.openweathermap.org/data/2.5/weather"
        params = {"q": WEATHER_CITY, "appid": WEATHER_API_KEY, "units": WEATHER_UNITS}
        r = requests.get(url, params=params, timeout=8)
        r.raise_for_status()
        data = r.json()
        desc = data["weather"][0]["description"].capitalize()
        temp = round(data["main"]["temp"])
        feels = round(data["main"].get("feels_like", temp))
        city = data["name"]
        return f"The weather in {city} is {desc}, around {temp}°C (feels like {feels}°C)."
    except Exception:
        return "I tried to check the weather but couldn’t reach the service."

# Intent regex
GREETING_RE = re.compile(r"^(hi|hello|hey|yo|sup|hola|namaste)\b", re.I)
HOW_ARE_YOU_RE = re.compile(r"\b(how are you|how’s it going|how r u|how are u)\b", re.I)
WEATHER_RE = re.compile(r"\b(weather|temperature|hot|cold|rain)\b", re.I)

def handle_intents(msg: str) -> Optional[str]:
    text = msg.strip()
    if GREETING_RE.search(text):
        return "👋 Hi! I’m Shiv. How can I help you?"
    if HOW_ARE_YOU_RE.search(text):
        return "I’m doing great, thanks for asking! How about you?"
    if WEATHER_RE.search(text):
        return get_weather_text()
    return None

# ===================== Routes =====================
@app.get("/health")
def health():
    return {"ok": True, "items": len(meta["questions"]), "device": DEVICE, "model": EMB_MODEL_NAME}

@app.post("/chat", response_model=ChatOut)
def chat(inp: ChatIn):
    q = inp.message.strip()
    if not q:
        raise HTTPException(status_code=400, detail="Empty message.")

    # --- 1. Intent handling (hello, weather, etc.)
    intent_ans = handle_intents(q)
    if intent_ans:
        return ChatOut(answer=intent_ans, source={"intent": True})

    # --- 2. Semantic search
    ctx = top_k_context(q, TOP_K)
    top_q, top_a, top_score = ctx[0]

    # --- 3. If confident and generator disabled → direct CSV answer
    if top_score >= SIM_THRESHOLD and not USE_GENERATOR:
        return ChatOut(answer=top_a, source={"matched_question": top_q, "score": top_score})

    # --- 4. If generator enabled → try safe call
    if USE_GENERATOR and generator:
        try:
            system = (
                "You are Shiv Sunder Pradhan. Always reply in first person (I, me, my). "
                "Be natural, conversational, and polite. "
                "If context doesn’t cover the question, say 'I’m not sure about that yet.'"
            )
            context_blob = "\n".join([f"- Q: {q_}\n  A: {a_}" for (q_, a_, _) in ctx])
            user = f"Someone asked you: {q}\n\nHere are some facts you’ve shared:\n{context_blob}\n\nReply as Shiv."

            ans = call_generator(system, user, max_new_tokens=220)

            if not ans.strip():  # if generator returns empty
                ans = top_a if top_score >= SIM_THRESHOLD else "I’m Shiv, and I’m not sure about that yet."
            return ChatOut(answer=ans, source={"matched_question": top_q, "score": top_score, "top_k": ctx})

        except Exception as e:
            print(f"[ERROR] Generator crashed: {e}")
            # Fall back to CSV or polite default
            if top_score >= SIM_THRESHOLD:
                return ChatOut(answer=top_a, source={"matched_question": top_q, "score": top_score})
            else:
                return ChatOut(answer="I’m Shiv, and I’m not sure about that yet. 🙂", source={"error": "generator failed"})

    # --- 5. Last fallback
    return ChatOut(
        answer="I’m Shiv, and I don’t have an answer for that yet. 🙂",
        source={"matched_question": top_q, "score": top_score}
    )

@app.post("/reindex")
def reindex():
    global embeddings, meta, embed_model
    df = load_csv(DATA_PATH)
    embeddings, meta = build_index(df, EMB_MODEL_NAME, DEVICE)
    embed_model = SentenceTransformer(EMB_MODEL_NAME, device=DEVICE)
    return {"ok": True, "items": len(meta["questions"]), "model": EMB_MODEL_NAME}


from fastapi.staticfiles import StaticFiles

# Serve React frontend
app.mount("/", StaticFiles(directory="server/frontend", html=True), name="frontend")