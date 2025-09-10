import axios from "axios";

export const api = axios.create({
  baseURL: "https://moto-backend-rv02.onrender.com", 
  // baseURL: "http://192.168.1.99:5000",
  // baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});
//add your wifi IPv4 address change this 192.168.1.10
