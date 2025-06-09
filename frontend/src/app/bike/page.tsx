"use client";
import { api } from "@/lib/axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HeroSection } from "../components/HeroSection";
import { ProductSection } from "../components/ProductSection";
import { CountdownSection } from "../components/CountDown";

type Bike = {
  _id: string;
  title: string;
  bikeModel: string;
  cc: string;
  power: string;
  image: string;
};

const Page = () => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBike() {
      setLoading(true);
      try {
        const res = await api.get("/api/bike/bikes");
        setBikes(res.data);
      } catch (err) {
        console.error("Мотоцикл татахад алдаа гарлаа:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBike();
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <>
      <HeroSection />
      <div className="min-h-screen bg-black text-white px-4 py-24">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[#F95F19]">
          Бүх мотоциклууд
        </h1>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-[#1a1a1a] p-4 rounded-lg animate-pulse"
                >
                  <div className="bg-gray-700 h-56 w-full rounded mb-4" />
                  <div className="h-4 bg-gray-600 rounded w-2/3 mb-2" />
                  <div className="h-4 bg-gray-600 rounded w-1/2" />
                </div>
              ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {bikes.slice(0, visibleCount).map((bike) => (
                <div
                  key={bike._id}
                  className="bg-[#1a1a1a] p-4 rounded-xl shadow hover:shadow-lg transition duration-300"
                >
                  <div className="relative w-full h-56 mb-4 rounded overflow-hidden">
                    <Image
                      src={bike.image}
                      alt={bike.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-[#F95F19] mb-1 truncate">
                    {bike.title}
                  </h2>
                  <p className="text-sm text-gray-400 mb-2">{bike.bikeModel}</p>
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>CC: {bike.cc}</span>
                    <span>Хүч: {bike.power}</span>
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < bikes.length && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={loadMore}
                  className="px-6 py-2 bg-[#F95F19] hover:bg-[#e94d0f] text-white rounded-full font-semibold transition"
                >
                  Цааш үзэх
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <ProductSection />
      <CountdownSection />
    </>
  );
};

export default Page;
