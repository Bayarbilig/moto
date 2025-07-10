import axios from "axios";

export const api = axios.create({
  baseURL: "https://elite-moto-backend.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});
