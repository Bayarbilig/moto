"use client";
import { api } from "@/lib/axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Equipment } from "../components/Types";
import { Access } from "../components/ProductSection";

type Bike = {
  _id: string;
  title: string;
  bikeModel: string;
  cc: string;
  power: string;
  price: number;
  images: string[];
};

const Page = () => {
  const [bike, setBike] = useState<Bike[]>([]);
  const [accessories, setAccessories] = useState<Access[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const initialType =
    typeParam === "bike" ||
    typeParam === "accessories" ||
    typeParam === "equipment"
      ? typeParam
      : "bike";
  const [selectedType, setSelectedType] = useState<
    "bike" | "accessories" | "equipment"
  >(initialType);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const router = useRouter();

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
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType, searchQuery]);

  const handleClickAccessories = (id: string) =>
    router.push(`/showroom/${id}?type=accessories`);
  const handleClickEquipment = (id: string) =>
    router.push(`/showroom/${id}?type=equipment`);
  const handleClickBike = (id: string) =>
    router.push(`/showroom/${id}?type=bike`);

  const filteredItems = {
    bike: bike.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
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
    if (page >= 1 && page <= totalPages[selectedType]) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-32">
      <div className="max-w-7xl mx-auto mb-10 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="search"
          placeholder="Хайлт..."
          className="w-[300px] px-4 py-2 rounded bg-[#1a1a1a] text-white border border-gray-700"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
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
            <option value="bike">Motorcycles</option>
            <option value="accessories">Accessories</option>
            <option value="equipment">Equipments</option>
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
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {selectedType === "bike" &&
          paginatedItems.bike.map((bike, index) => (
            <div
              key={index}
              onClick={() => handleClickBike(bike._id)}
              className="cursor-pointer group bg-gradient-to-br from-[#1a1a1a] to-[#111] border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative w-full h-56 bg-[#0f0f0f]">
                <Image
                  src={bike.images[0]}
                  alt={bike.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-semibold text-[#F95F19] mb-2 tracking-wide max-w-[400px] truncate">
                  {bike.title}
                </h2>
                <p className="text-gray-400 text-sm mb-1">{bike.bikeModel}</p>
                <p className="text-[#F95F19] font-semibold text-sm mb-3">
                  {bike.price.toLocaleString()}₮
                </p>
                <div className="flex justify-between text-sm text-gray-300 border-t border-gray-700 pt-3">
                  <span>Багтаамж: {bike.cc}</span>
                  <span>Хүч: {bike.power}</span>
                </div>
              </div>
            </div>
          ))}

        {selectedType === "accessories" &&
          paginatedItems.accessories.map((item, index) => (
            <div
              onClick={() => handleClickAccessories(item._id)}
              key={index}
              className="cursor-pointer group bg-gradient-to-br from-[#1a1a1a] to-[#111] border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative w-full h-56 bg-[#0f0f0f]">
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="contain"
                  className="transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-semibold text-[#F95F19] mb-2 tracking-wide max-w-[400px] truncate">
                  {item.name}
                </h2>
                <p className="text-gray-400 text-sm mb-1">{item.brand}</p>
                <p className="text-[#F95F19] font-semibold text-sm mb-3">
                  {item.price.toLocaleString()}₮
                </p>
              </div>
            </div>
          ))}

        {selectedType === "equipment" &&
          paginatedItems.equipment.map((item, index) => (
            <div
              key={index}
              onClick={() => handleClickEquipment(item._id)}
              className="cursor-pointer group bg-gradient-to-br from-[#1a1a1a] to-[#111] border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative w-full h-56 bg-[#0f0f0f]">
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="contain"
                  className="transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-semibold text-[#F95F19] mb-2 tracking-wide max-w-[400px] truncate">
                  {item.name}
                </h2>
                <p className="text-gray-400 text-sm mb-1">{item.brand}</p>
                <p className="text-[#F95F19] font-semibold text-sm mb-3">
                  {item.price.toLocaleString()}₮
                </p>
              </div>
            </div>
          ))}
      </div>

      {filteredItems[selectedType].length > itemsPerPage && (
        <div className="flex justify-center mt-10 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-[#1a1a1a] border border-gray-600 rounded text-white disabled:opacity-50"
          >
            Өмнөх
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
            Дараах
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
