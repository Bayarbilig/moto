import axios from "axios";

export const api = axios.create({
  baseURL: "https://moto-backend-rv02.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
