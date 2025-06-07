// accessories/page.tsx
"use client";
import { useEffect, useState } from "react";
import { fetchData } from "@/lib/fetchUtils";
import { ProductGrid } from "../components/ProductGrid";


export default function ListAllAccessories() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAccessories = async () => {
      setLoading(true);
      const res = await fetchData("/api/accessories");
      setData(res);
      setLoading(false);
    };

    getAccessories();
  }, []);

  return (
    <ProductGrid title="Бүх сэлбэгүүд" items={data} loading={loading} />
  );
}
