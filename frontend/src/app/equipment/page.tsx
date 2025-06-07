// equipment/page.tsx
"use client";
import { useEffect, useState } from "react";
import { fetchData } from "@/lib/fetchUtils";
import { ProductGrid } from "../components/ProductGrid";


export default function ListAllEquipment() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEquipment = async () => {
      setLoading(true);
      const res = await fetchData("/api/equipment");
      setData(res);
      setLoading(false);
    };

    getEquipment();
  }, []);

  return (
    <ProductGrid title="Бүх багаж хэрэгсэл" items={data} loading={loading} />
  );
}
