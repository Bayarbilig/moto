"use client";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "@/lib/axios";
import { Equipment } from "./Types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

interface Access {
  model?: string;
  brand: string | { name: string };
  price: string;
  id?: string;
  image: string;
  _id: string;
  name: string;
}

export const ProductSection = () => {
  const accessoriesRef = useRef<HTMLDivElement>(null);
  const equipmentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { t } = useTranslation("products");

  const [accessories, setAccessories] = useState<Access[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const scroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right"
  ) => {
    const container = ref.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.75;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [accessoryRes, equipmentRes] = await Promise.all([
        api.get("/api/accessories"),
        api.get("/api/equipment"),
      ]);
      setAccessories(accessoryRes.data);
      setEquipment(equipmentRes.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const SkeletonCard = () => (
    <div className="min-w-[160px] sm:min-w-[200px] md:min-w-[240px] max-w-[260px] bg-moto-gray rounded-md p-3 animate-pulse">
      <div className="w-full aspect-[4/3] bg-gray-700 rounded mb-3" />
      <div className="h-4 bg-gray-600 rounded w-1/2 mb-2" />
      <div className="h-4 bg-gray-600 rounded w-2/3" />
    </div>
  );

  const renderProducts = (
    items: Access[] | Equipment[],
    type: "accessory" | "equipment"
  ) => (
    <div className="relative">
      {isLoading ? (
        <div className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-6 snap-x snap-mandatory">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <SkeletonCard key={i} />
            ))}
        </div>
      ) : items.length === 0 ? (
        <p className="text-white py-6 text-sm sm:text-base">
          {t("noProducts")}
        </p>
      ) : (
        <>
          <div
            ref={type === "accessory" ? accessoriesRef : equipmentRef}
            className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scroll-smooth pb-6 snap-x snap-mandatory scrollbar-hide"
          >
            {items.slice(0, 10).map((product, index) => (
              <Link
                key={index}
                href={`/${type}/${product._id}`}
                className="snap-start min-w-[160px] sm:min-w-[200px] md:min-w-[240px] max-w-[260px] bg-moto-gray rounded-md overflow-hidden flex-shrink-0"
              >
                <div className="relative aspect-[4/3] overflow-hidden border-b mb-2 border-gray-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-0 left-2 bg-[#F95F19] w-fit transform -skew-x-12">
                    <span className="product-price text-white py-1 px-2 text-sm">
                      {product.price}₮
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-gray-400 text-xs sm:text-sm uppercase truncate">
                    {typeof product.brand === "string"
                      ? product.brand
                      : product.brand?.name}
                  </p>

                  <h3 className="text-white font-bold mt-1 text-sm sm:text-base truncate">
                    {product.name}
                    {product.model ? ` ${product.model}` : ""}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {items.length > 4 && (
            <>
              <button
                onClick={() =>
                  scroll(
                    type === "accessory" ? accessoriesRef : equipmentRef,
                    "left"
                  )
                }
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 p-2 bg-[#F95F19] rounded-full hidden md:block"
              >
                <BiChevronLeft size={24} className="text-white" />
              </button>
              <button
                onClick={() =>
                  scroll(
                    type === "accessory" ? accessoriesRef : equipmentRef,
                    "right"
                  )
                }
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 p-2 bg-[#F95F19] rounded-full hidden md:block"
              >
                <BiChevronRight size={24} className="text-white" />
              </button>
            </>
          )}
        </>
      )}

      {!isLoading && items.length > 0 && (
        <div className="mt-4 text-right pr-2 sm:pr-4">
          <button
            onClick={() =>
              router.push(type === "accessory" ? "/accessories" : "/equipment")
            }
            className="text-[#F95F19] hover:underline text-sm sm:text-base"
          >
            {t("viewAll")} →
          </button>
        </div>
      )}
    </div>
  );

  return (
    <section
      className="py-16 bg-moto-dark bg-cover space-y-24"
      style={{ backgroundImage: "url('/section2.png')" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <h2 className="text-base sm:text-lg md:text-xl font-bold mb-6 text-white">
          {t("accessoriesTitle")}
        </h2>
        {renderProducts(accessories, "accessory")}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <h2 className="text-base sm:text-lg md:text-xl font-bold mb-6 text-white">
          {t("equipmentTitle")}
        </h2>
        {renderProducts(equipment, "equipment")}
      </div>
    </section>
  );
};
