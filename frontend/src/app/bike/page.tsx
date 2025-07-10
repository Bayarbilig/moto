"use client";
import { api } from "@/lib/axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  useEffect(() => {
    async function fetchBike() {
      try {
        const res = await api.get("/api/bike/bikes");
        setBike(res.data);
      } catch (err) {
        console.error("Failed to fetch bikes", err);
      }
    }
    fetchBike();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-32">
      <h1 className="text-4xl font-bold text-center mb-12 text-[#F95F19]">
        Бүх мотоциклууд
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {bike.map((bike, index) => (
          <div
            key={index}
            onClick={() => router.push(`/bike/${bike._id}`)}
            className="cursor-pointer group bg-gradient-to-br from-[#1a1a1a] to-[#111] border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="relative w-full h-56 bg-[#0f0f0f]">
              <Image
                src={bike.images[0]}
                alt={bike.title}
                layout="fill"
                objectFit="cover"
                className=" transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent z-10"></div>
            </div>

            <div className="p-5">
              <h2 className="text-xl font-semibold text-[#F95F19] mb-2 tracking-wide">
                {bike.title}
              </h2>
              <p className="text-gray-400 text-sm mb-1">{bike.bikeModel}</p>
              <p className="text-[#F95F19] font-semibold text-sm mb-3">
                {bike.price}₮
              </p>
              {/* price here */}
              <div className="flex justify-between text-sm text-gray-300 border-t border-gray-700 pt-3">
                <span>Багтаамж: {bike.cc}</span>
                <span>Хүч: {bike.power}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
