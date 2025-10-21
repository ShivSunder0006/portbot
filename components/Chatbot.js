import React, { useState, useRef, useEffect } from "react";
import { sendMessage } from "../api";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([
    { role: "bot", text: "👋 Hi! I’m Shiv. Ask me about my skills, projects, or experience." }
  ]);
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  const onSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const msg = input.trim();
    setMsgs([...msgs, { role: "user", text: msg }]);
    setInput("");
    setBusy(true);
    try {
      const res = await sendMessage(msg);
      setMsgs(m => [...m, { role: "bot", text: res.answer }]);
    } catch {
      setMsgs(m => [...m, { role: "bot", text: "❌ Server error. Try again later." }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed", right: 20, bottom: 20,
          borderRadius: "50%", width: 60, height: 60,
          background: "#111827", color: "white", fontSize: 16,
        }}
      >
        {open ? "✖" : "💬"}
      </button>

      {open && (
        <div
          style={{
            position: "fixed", right: 20, bottom: 90, width: 340, maxHeight: 500,
            background: "white", borderRadius: 16, display: "flex", flexDirection: "column",
            boxShadow: "0 12px 32px rgba(0,0,0,0.25)", overflow: "hidden"
          }}
        >
          <div style={{ padding: 12, fontWeight: 700 }}>🤖 Ask Shiv</div>
          <div style={{ flex: 1, padding: 12, overflowY: "auto" }}>
            {msgs.map((m, i) => (
              <div key={i}
                   style={{
                     textAlign: m.role === "user" ? "right" : "left",
                     margin: "6px 0"
                   }}>
                <span style={{
                  background: m.role === "user" ? "#111827" : "#f3f4f6",
                  color: m.role === "user" ? "white" : "#111827",
                  padding: "8px 12px", borderRadius: 12, display: "inline-block"
                }}>{m.text}</span>
              </div>
            ))}
            {busy && <div>💭 Thinking…</div>}
            <div ref={endRef} />
          </div>
          <form onSubmit={onSend} style={{ display: "flex", borderTop: "1px solid #eee" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me..."
              style={{ flex: 1, padding: 10, border: "none", outline: "none" }}
            />
            <button type="submit" disabled={busy}
              style={{ padding: "10px 14px", background: "#111827", color: "white", border: "none" }}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Chatbot;
