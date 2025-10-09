import axios from "axios";

const api = axios.create({
  baseURL: "", // same domain (HF Space serves frontend + backend together)
  timeout: 15000,
});

export async function sendMessage(message) {
  const { data } = await api.post("/chat", { message });
  return data;
}

export default api;
