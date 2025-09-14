"use client";

import { api } from "@/lib/axios";
import Image from "next/image";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useParams } from "next/navigation";
import { Equipment } from "../components/Types";
import { Access } from "../components/ProductSection";
import { useTranslation } from "next-i18next";

type Bike = {
  _id: string;
  title: string;
  bikeModel: string;
  cc: string;
  power: string;
  price: number;
  biketype?: string;
  images: string[];
  discount?: string;
  saled: boolean;
};

const ShowroomContent = () => {
  const { t } = useTranslation("common");
  const params = useParams();
  const router = useRouter();

  const typeParam = params.type; // motorcycles, accessories, equipments
  const [selectedType, setSelectedType] = useState<
    "bike" | "accessories" | "equipment"
  >("bike");

  const [bike, setBike] = useState<Bike[]>([]);
  const [accessories, setAccessories] = useState<Access[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [bikeCategory, setBikeCategory] = useState<
    { _id: string; name: string }[]
  >([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [biketypeFilter, setBiketypeFilter] = useState<string>("");
  const itemsPerPage = 9;

  // Set selectedType based on dynamic route
  useEffect(() => {
    if (typeParam === "motorcycles") setSelectedType("bike");
    else if (typeParam === "accessories") setSelectedType("accessories");
    else if (typeParam === "equipments") setSelectedType("equipment");
    else setSelectedType("bike");
  }, [typeParam]);

  // Fetch data
  useEffect(() => {
    api
      .get("/api/bike/bikes")
      .then((res) => setBike(res.data))
      .catch(console.error);
    api
      .get("/api/accessories")
      .then((res) => setAccessories(res.data))
      .catch(console.error);
    api
      .get("/api/equipment")
      .then((res) => setEquipment(res.data))
      .catch(console.error);
    api
      .get("/api/bikeCategory")
      .then((res) => setBikeCategory(res.data))
      .catch(console.error);
  }, []);

  // Reset page when filter/search changes
  useEffect(
    () => setCurrentPage(1),
    [selectedType, searchQuery, biketypeFilter]
  );

  // Filtered items
  const filteredItems = {
    bike: bike
      .filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((item) =>
        biketypeFilter ? item.biketype === biketypeFilter : true
      ),
    accessories: accessories.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    equipment: equipment.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  };

  const paginatedItems = {
    bike: filteredItems.bike.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ),
    accessories: filteredItems.accessories.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ),
    equipment: filteredItems.equipment.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ),
  };

  const totalPages = {
    bike: Math.ceil(filteredItems.bike.length / itemsPerPage),
    accessories: Math.ceil(filteredItems.accessories.length / itemsPerPage),
    equipment: Math.ceil(filteredItems.equipment.length / itemsPerPage),
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages[selectedType]) setCurrentPage(page);
  };

  const handleClickItem = (id: string, type: string) =>
    router.push(`/showroom/${id}?type=${type}`);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-32">
      {/* Search & Type Select */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="search"
          placeholder={t("search")}
          className="w-[300px] px-4 py-2 rounded bg-[#1a1a1a] text-white border border-gray-700"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Item Type */}
        <div className="relative inline-block w-[300px]">
          <select
            value={selectedType}
            onChange={(e) =>
              setSelectedType(
                e.target.value as "bike" | "accessories" | "equipment"
              )
            }
            className="w-full appearance-none px-4 py-2 rounded bg-[#1a1a1a] text-white border border-gray-700"
          >
            <option value="bike">{t("motorcycle")}</option>
            <option value="accessories">{t("accessories")}</option>
            <option value="equipment">{t("equipments")}</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Bike Category Filter */}
        {selectedType === "bike" && (
          <div className="relative inline-block w-[300px]">
            <select
              value={biketypeFilter}
              onChange={(e) => setBiketypeFilter(e.target.value)}
              className="w-full appearance-none px-4 py-2 rounded bg-[#1a1a1a] text-white border border-gray-700"
            >
              <option value="">{t("all_categories")}</option>
              {bikeCategory.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {t(cat.name)}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {selectedType === "bike" &&
          paginatedItems.bike.map((bike, index) => {
            const discountedPrice =
              bike.discount && bike.discount !== "0"
                ? bike.price - (bike.price * Number(bike.discount)) / 100
                : bike.price;

            return (
              <div
                key={index}
                onClick={() => handleClickItem(bike._id, "bike")}
                className="cursor-pointer relative group bg-gradient-to-br from-[#1a1a1a] to-[#111] border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                {bike.saled && (
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded z-10">
                    {t("sold_out")}
                  </span>
                )}

                <div className="relative w-full h-56 bg-[#0f0f0f]">
                  <Image
                    src={bike.images[0]}
                    alt={bike.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-semibold text-[#F95F19] mb-2 tracking-wide max-w-[400px] truncate">
                    {bike.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-1">{bike.bikeModel}</p>
                  <p className="text-[#F95F19] font-semibold text-sm mb-3">
                    {bike.discount && bike.discount !== "0" ? (
                      <>
                        <span className="line-through text-gray-500 mr-2">
                          {bike.price.toLocaleString()}₮
                        </span>
                        <span>{discountedPrice.toLocaleString()}₮</span>
                      </>
                    ) : (
                      <span>{bike.price.toLocaleString()}₮</span>
                    )}
                  </p>

                  <div className="flex justify-between text-sm text-gray-300 border-t border-gray-700 pt-3">
                    <span>
                      {t("capacity")}: {bike.cc} cc
                    </span>
                    <span>
                      {t("power")}: {bike.power} hp
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

        {["accessories", "equipment"].map(
          (type) =>
            selectedType === type &&
            paginatedItems[type as "accessories" | "equipment"].map(
              (item, index) => {
                const discountedPrice =
                  item.discount && item.discount !== "0"
                    ? Number(item.price) -
                      (Number(item.price) * Number(item.discount)) / 100
                    : Number(item.price);

                return (
                  <div
                    key={index}
                    onClick={() => handleClickItem(item._id, type)}
                    className="cursor-pointer group bg-gradient-to-br from-[#1a1a1a] to-[#111] border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="relative w-full h-56 bg-[#0f0f0f]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        style={{ objectFit: "contain" }}
                        className="transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <h2 className="text-xl font-semibold text-[#F95F19] mb-2 tracking-wide max-w-[400px] truncate">
                        {item.name}
                      </h2>
                      <p className="text-gray-400 text-sm mb-1">{item.brand}</p>
                      <p className="text-[#F95F19] font-semibold text-sm mb-3">
                        {item.discount && item.discount !== "0" ? (
                          <>
                            <span className="line-through text-gray-500 mr-2">
                              {item.price.toLocaleString()}₮
                            </span>
                            <span>{discountedPrice.toLocaleString()}₮</span>
                          </>
                        ) : (
                          <span>{item.price.toLocaleString()}₮</span>
                        )}
                      </p>
                    </div>
                  </div>
                );
              }
            )
        )}
      </div>

      {/* Pagination */}
      {filteredItems[selectedType].length > itemsPerPage && (
        <div className="flex justify-center mt-10 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-[#1a1a1a] border border-gray-600 rounded text-white disabled:opacity-50"
          >
            {t("previous")}
          </button>

          {[...Array(totalPages[selectedType])].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded border ${
                currentPage === i + 1
                  ? "bg-[#F95F19] text-white border-transparent"
                  : "bg-[#1a1a1a] text-white border-gray-600"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages[selectedType]}
            className="px-4 py-2 bg-[#1a1a1a] border border-gray-600 rounded text-white disabled:opacity-50"
          >
            {t("next")}
          </button>
        </div>
      )}
    </div>
  );
};

const ShowroomLoading = () => {
  const { t } = useTranslation("common");

  return (
    <div className="min-h-screen bg-black text-white px-4 py-32 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#F95F19] mx-auto mb-4"></div>
        <p className="text-gray-400">{t("loading_showroom")}</p>
      </div>
    </div>
  );
};

const ShowroomPage = () => {
  return (
    <Suspense fallback={<ShowroomLoading />}>
      <ShowroomContent />
    </Suspense>
  );
};

export default ShowroomPage;
