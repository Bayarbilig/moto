// app/accessories/page.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchData } from "@/lib/fetchUtils";
import { ProductGrid } from "../components/ProductGrid";
import { useTranslation } from "react-i18next";

export default function ListAllAccessories() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation("accessoryList");

  useEffect(() => {
    const getAccessories = async () => {
      setLoading(true);
      const res = await fetchData("/api/accessories");
      setData(res);
      setLoading(false);
    };

    getAccessories();
  }, []);

  return <ProductGrid title={t("title")} items={data} loading={loading} />;
}
