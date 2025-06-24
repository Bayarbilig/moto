import { api } from "@/lib/axios";
import { Bike } from "../components/Types";


export function getBikes(page = 1, search = "") {
  return api
    .get<{ data: Bike[]; total: number }>("/api/bikes/bikes", {
      params: { page, search },
    })
    .then((res) => res.data);
}
