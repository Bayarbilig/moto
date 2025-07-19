import axios from "axios";

export const api = axios.create({
  // baseURL: "https://elite-moto-backend.vercel.app/",
    baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});