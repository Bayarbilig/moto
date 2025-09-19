"use client";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "@/lib/axios";
import { Equipment } from "./Types";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";

export interface Access {
  model: string;
  brand: string;
  price: string;
  id: null | undefined;
  image: string;
  _id: string;
  name: string;
  discount?: string;
}

export const ProductSection = () => {
  const accessoriesRef = useRef<HTMLDivElement>(null);
  const equipmentRef = useRef<HTMLDivElement>(null);
  const [accessories, setAccessories] = useState<Access[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const router = useRouter();
  const { t } = useTranslation("common");

  const scrollAccessories = (direction: "left" | "right") => {
    const container = accessoriesRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.75;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollEquipment = (direction: "left" | "right") => {
    const container = equipmentRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.75;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const fetchAccessories = useCallback(async () => {
    try {
      const res = await api.get("/api/accessories");
      setAccessories(res.data);
    } catch (error) {
      console.error("Failed to fetch accessories:", error);
    }
  }, []);

  const fetchEquipment = useCallback(async () => {
    try {
      const res = await api.get("/api/equipment");
      setEquipment(res.data);
    } catch (error) {
      console.error("Failed to fetch equipment:", error);
    }
  }, []);

  useEffect(() => {
    fetchEquipment();
    fetchAccessories();
  }, [fetchEquipment, fetchAccessories]);

  const handleClickAccessories = () => {
    router.push("/showroom?type=accessories");
  };
  const handleClickEquipment = () => {
    router.push("/showroom?type=equipment");
  };
  const handleClickAccessoriesId = (id: string) => {
    router.push(`/showroom/${id}?type=accessories`);
  };
  const handleClickEquipmentId = (id: string) => {
    router.push(`/showroom/${id}?type=equipment`);
  };

  return (
    <section className="py-12 md:py-16 bg-moto-dark bg-cover space-y-20">
      {/* Accessories */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg md:text-2xl font-bold text-white">
            {t("moto_parts")}
          </h2>
          <button
            onClick={handleClickAccessories}
            className="text-[#F95F19] text-sm md:text-base"
          >
            {t("wiew_all")}
          </button>
        </div>

        <div className="relative">
          <div
            ref={accessoriesRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth scrollbar-hide pb-4"
          >
            {accessories.map((product) => (
              <button
                // onClick={() => handleClickAccessoriesId(product._id)}
                key={product._id}
                className="w-48 sm:w-56 md:w-64 bg-[#2f2e2e] rounded-lg overflow-hidden flex-shrink-0"
              >
                <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-3 bg-[#F95F19] w-fit transform -skew-x-12">
                    <span className="product-price text-white py-1 px-2 text-xs sm:text-sm">
                      {product.price}₮
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-black h-full">
                  <p className="text-gray-400 text-xs uppercase">
                    {product.brand}
                  </p>
                  <h3 className="text-white font-bold mt-1 text-sm line-clamp-2">
                    {product.name}
                    {product.model && ` ${product.model}`}
                  </h3>
                </div>
              </button>
            ))}
          </div>

          {accessories.length > 4 && (
            <>
              <button
                onClick={() => scrollAccessories("left")}
                className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 p-2 bg-[#F95F19] rounded-full hidden md:block"
              >
                <BiChevronLeft size={20} className="text-white" />
              </button>
              <button
                onClick={() => scrollAccessories("right")}
                className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 p-2 bg-[#F95F19] rounded-full hidden md:block"
              >
                <BiChevronRight size={20} className="text-white" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Equipment */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg md:text-2xl font-bold text-white">
            {t("moto_accessories")}
          </h2>
          <button
            onClick={handleClickEquipment}
            className="text-[#F95F19] text-sm md:text-base"
          >
            {t("wiew_all")}
          </button>
        </div>

        <div className="relative">
          <div
            ref={equipmentRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth scrollbar-hide pb-4"
          >
            {equipment.map((product) => (
              <button
                // onClick={() => handleClickEquipmentId(product._id)}
                key={product._id}
                className="w-48 sm:w-56 md:w-64 bg-[#2f2e2e] rounded-lg overflow-hidden flex-shrink-0"
              >
                <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-3 bg-[#F95F19] w-fit transform -skew-x-12">
                    <span className="product-price text-white py-1 px-2 text-xs sm:text-sm">
                      {product.price}₮
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-black h-full">
                  <p className="text-gray-400 text-xs uppercase">
                    {product.brand}
                  </p>
                  <h3 className="text-white font-bold mt-1 text-sm line-clamp-2">
                    {product.name}
                    {product.model && ` ${product.model}`}
                  </h3>
                </div>
              </button>
            ))}
          </div>

          {equipment.length > 4 && (
            <>
              <button
                onClick={() => scrollEquipment("left")}
                className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 p-2 bg-[#F95F19] rounded-full hidden md:block"
              >
                <BiChevronLeft size={20} className="text-white" />
              </button>
              <button
                onClick={() => scrollEquipment("right")}
                className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 p-2 bg-[#F95F19] rounded-full hidden md:block"
              >
                <BiChevronRight size={20} className="text-white" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
