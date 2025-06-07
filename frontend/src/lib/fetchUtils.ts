// lib/fetchUtils.ts
import { api } from "./axios";

export async function fetchData(endpoint: string) {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(`${endpoint} татахад алдаа гарлаа:`, error);
    return [];
  }
}
