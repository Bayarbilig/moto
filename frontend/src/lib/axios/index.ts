import axios from "axios";

export const api = axios.create({
  baseURL: "https://moto-backend-rv02.onrender.com",
  // baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});
