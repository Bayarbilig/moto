// Client wrapper component for interactivity (optional)
"use client";
import React from "react";

import { fetchData } from "@/lib/fetchUtils";
import { ProductGrid } from "../components/ProductGrid";

// ProductItem interface
interface ProductItem {
  _id: string;
  name: string;
  brand: string;
  model?: string;
  price: string;
  image: string;
}

// Accessory API shape
interface Accessory {
  _id: string;
  title: string;
  description?: string;
  image: string;
  price: number;
  category?: string;
  brand?: string;
  model?: string;
  [key: string]: any;
}

interface AccessoriesClientProps {
  data: ProductItem[];
  loading: boolean;
  error: string | null;
  title: string;
}

const AccessoriesClient = ({
  data,
  loading,
  error,
  title,
}: AccessoriesClientProps) => {
  return (
    <ProductGrid title={title} items={data} loading={loading} error={error} />
  );
};

// Server component page
export default async function AccessoriesPage() {
  // Here you can optionally load translations with i18next server methods if you have setup
  // For simplicity, hardcoding title/error text here, or you can pass in translation strings.

  let data: ProductItem[] = [];
  let error: string | null = null;

  try {
    const res = await fetchData("/api/accessories");

    data = (Array.isArray(res) ? res : []).map((item: Accessory) => ({
      _id: item._id,
      name: item.title || "Untitled",
      brand: item.brand || "Generic",
      model: item.model || "",
      price: item.price?.toLocaleString() || "0",
      image: item.image || "/placeholder.png",
    }));
  } catch (e) {
    console.error("Failed to fetch accessories on server:", e);
    error = "Error loading accessories";
  }

  return (
    <AccessoriesClient
      data={data}
      loading={false}
      error={error}
      title={"Accessories"} // Replace with translation on server if configured
    />
  );
}
