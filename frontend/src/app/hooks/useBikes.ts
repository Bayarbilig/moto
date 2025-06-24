import { useState, useEffect } from "react";

import { Bike } from "../components/Types";
import { getBikes } from "../services/bikeService";


export default function useBikes(page: number, search: string) {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data, total } = await getBikes(page, search);
        setBikes(data);
        setTotal(total);
      } catch {
        setError("Алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [page, search]);

  return { bikes, total, loading, error };
}
