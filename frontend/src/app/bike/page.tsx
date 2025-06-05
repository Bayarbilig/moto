"use client";
import { api } from "@/lib/axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HeroSection } from "../components/HeroSection";
// import { BrandTabs } from "../components/BrandTabs";
import { ProductSection } from "../components/ProductSection";
import { CountdownSection } from "../components/CountDown";

// Bike type
type Bike = {
  _id: string;
  title: string;
  bikeModel: string;
  cc: string;
  power: string;
  image: string;
};

// Bike data (same as in BrandTabs)

const Page = () => {
  const [bike, setBike] = useState<Bike[]>([]);
  useEffect(() => {
    async function fetchBike() {
      try {
        const res = await api.get("/api/bike/bikes");
        setBike(res.data);
      } catch {}
    }
    fetchBike();
  }, []);

  return (
    <>
      <HeroSection />
      <div className="min-h-screen bg-black text-white px-4 py-32">
        <h1 className="text-4xl font-bold text-center mb-10 text-[#F95F19]">
          Бүх мотоциклууд
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {bike.map((bike, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="relative w-full h-56 mb-4">
                <Image
                  src={bike.image}
                  alt={bike.title}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <h2 className="text-xl font-semibold text-[#F95F19] mb-1">
                {bike.title}
              </h2>
              <p className="text-sm text-gray-400 mb-2">{bike.bikeModel}</p>
              <div className="flex justify-between text-sm text-gray-300">
                <span>Моторын багтаамж: {bike.cc}</span>
                <span>Хүч: {bike.power}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <BrandTabs /> */}
      <ProductSection />
      <CountdownSection />
    </>
  );
};

export default Page;
