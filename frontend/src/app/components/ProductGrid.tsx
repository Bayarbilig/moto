// components/ProductGrid.tsx

import React from "react";

interface ProductItem {
  _id: string;
  name: string;
  brand: string;
  model?: string;
  price: string;
  image: string;
}

interface ProductGridProps {
  title: string;
  items: ProductItem[];
  loading: boolean;
  error?: string | null;
}

export const SkeletonCard = () => (
  <div className="bg-moto-gray rounded p-4 animate-pulse">
    <div className="w-full aspect-[4/3] bg-gray-700 rounded mb-3" />
    <div className="h-4 bg-gray-600 rounded w-1/2 mb-2" />
    <div className="h-4 bg-gray-600 rounded w-2/3" />
  </div>
);

export const ProductGrid: React.FC<ProductGridProps> = ({
  title,
  items,
  loading,
  error,
}) => {
  const isEmpty = !loading && items.length === 0;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 my-6">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">
        {title}
      </h1>

      {error && (
        <p className="text-red-500 bg-red-100 p-4 rounded mb-6">{error}</p>
      )}

      {isEmpty && !error && (
        <p className="text-gray-400 text-center text-sm mb-6">
          No products available.
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : items.map((item) => (
              <div
                key={item._id}
                className="bg-moto-gray rounded overflow-hidden shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <p className="text-gray-400 text-xs">{item.brand}</p>
                  <h2 className="text-white font-bold text-sm line-clamp-2">
                    {item.name}
                    {item.model ? ` ${item.model}` : ""}
                  </h2>
                  <p className="text-[#F95F19] font-semibold mt-1">
                    {item.price}₮
                  </p>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};
