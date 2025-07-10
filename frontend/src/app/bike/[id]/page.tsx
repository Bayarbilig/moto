"use client";
import { api } from "@/lib/axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";

type Bike = {
  _id: string;
  title: string;
  bikeModel: string;
  cc: string;
  power: string;
  images: string[];
  details: string;
  price: number;
};

const BikeDetailPage = () => {
  const [bike, setBike] = useState<Bike | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const res = await api.get(`/api/bike/bikes/${id}`);
        setBike(res.data);
        setActiveImage(res.data.images[0]);
      } catch (err) {
        console.error("Bike not found:", err);
      }
    };
    if (id) fetchBike();
  }, [id]);

  if (!bike) {
    return <div className="text-white text-center py-40">Уншиж байна...</div>;
  }

  const currentIndex = bike.images.findIndex((img) => img === activeImage);
  const prevIndex =
    (currentIndex - 1 + bike.images.length) % bike.images.length;
  const nextIndex = (currentIndex + 1) % bike.images.length;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-32">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.push("/bike")}
          className="mb-6 text-sm text-[#F95F19] hover:underline"
        >
          ← Буцах
        </button>

        <div className="grid md:grid-cols-2 gap-10 items-start bg-[#1a1a1a] p-6 rounded-xl shadow-xl border border-gray-800">
          {/* Main Image with Hover Zoom */}
          <div>
            <div
              className="relative w-full h-96 rounded-xl overflow-hidden border border-gray-700 group cursor-zoom-in"
              onClick={() => setIsOpen(true)}
            >
              <Image
                src={activeImage || bike.images[0]}
                alt={bike.title}
                layout="fill"
                objectFit="cover"
                className="rounded-xl transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4 mt-4">
              {bike.images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-full h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-300 ${
                    activeImage === img
                      ? "border-[#F95F19]"
                      : "border-gray-700 hover:border-[#F95F19]/60"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`bike-${idx}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#F95F19] mb-4">
              {bike.title}
            </h1>
            <p className="text-gray-400 mb-6 text-lg">{bike.bikeModel}</p>

            <div className="space-y-3 text-base text-gray-300">
              <p>
                <span className="font-semibold text-white">
                  Моторын багтаамж:
                </span>{" "}
                {bike.cc} cc
              </p>
              <p>
                <span className="font-semibold text-white">Хүч:</span>{" "}
                {bike.power}
              </p>
              <p>
                <span className="font-semibold text-white">Үнэ:</span>{" "}
                {bike.price}₮
              </p>
              <p>
                <span className="font-semibold text-white">Тайлбар:</span>{" "}
                {bike.details}
              </p>
            </div>
          </div>
        </div>

        {/* Lightbox */}
        {isOpen && (
          <Lightbox
            mainSrc={bike.images[currentIndex]}
            nextSrc={bike.images[nextIndex]}
            prevSrc={bike.images[prevIndex]}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() => setActiveImage(bike.images[prevIndex])}
            onMoveNextRequest={() => setActiveImage(bike.images[nextIndex])}
          />
        )}
      </div>
    </div>
  );
};

export default BikeDetailPage;
