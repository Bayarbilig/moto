// app/equipment/page.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchData } from "@/lib/fetchUtils";
import { ProductGrid } from "../components/ProductGrid";
import { useTranslation } from "react-i18next";

export default function ListAllEquipment() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation("equipmentList");

  useEffect(() => {
    const getEquipment = async () => {
      setLoading(true);
      const res = await fetchData("/api/equipment");
      setData(res);
      setLoading(false);
    };

    getEquipment();
  }, []);

  return <ProductGrid title={t("title")} items={data} loading={loading} />;
}
