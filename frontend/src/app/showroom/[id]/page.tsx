"use client";
import { api } from "@/lib/axios";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";
import { Access } from "@/app/components/ProductSection";
import { Equipment } from "@/app/components/Types";

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

type ProductType = "bike" | "accessories" | "equipment";

type Item = any;

const BikeDetailPage = () => {
  const [item, setItem] = useState<Item | null>(null);
  const [type, setType] = useState<ProductType>("bike");
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const typeParam = searchParams.get("type") as ProductType;
    if (typeParam === "accessories" || typeParam === "equipment") {
      setType(typeParam);
    } else {
      setType("bike");
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        if (type === "bike") {
          res = await api.get(`/api/bike/bikes/${id}`);
        } else if (type === "accessories") {
          res = await api.get(`/api/accessories/${id}`);
        } else if (type === "equipment") {
          res = await api.get(`/api/equipment/${id}`);
        }

        setItem(res?.data);
        setActiveImage(
          res?.data.images?.[0] ? res?.data.images[0] : res?.data.image
        );
      } catch (err) {
        console.error("Item not found:", err);
      }
    };
    if (id) fetchData();
  }, [id, type]);

  if (!item) {
    return <div className="text-white text-center py-40">Уншиж байна...</div>;
  }

  const isBike = type === "bike";
  const images = item.images || [];
  const currentIndex = images.findIndex((img: any) => img === activeImage);
  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  const nextIndex = (currentIndex + 1) % images.length;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-32">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.push(`/showroom?type=${type}`)}
          className="mb-6 text-sm text-[#F95F19] hover:underline"
        >
          ← Буцах
        </button>

        <div className="grid md:grid-cols-2 gap-10 items-start bg-[#1a1a1a] p-6 rounded-xl shadow-xl border border-gray-800">
          <div>
            <div
              className="relative w-full h-96 rounded-xl overflow-hidden border border-gray-700 group cursor-zoom-in"
              onClick={() => setIsOpen(true)}
            >
              <Image
                src={activeImage || "/placeholder.png"}
                alt={item.title ? item.title : item.name}
                layout="fill"
                objectFit={type === "bike" ? "cover" : "contain"}
                className="rounded-xl transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {isBike && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {images.map((img: string, idx: number) => (
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
            )}
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#F95F19] mb-4">
              {item.name ? item.name : item.title}
            </h1>

            {isBike && (
              <p className="text-gray-400 mb-6 text-lg">
                {(item as Bike).bikeModel}
              </p>
            )}

            <div className="space-y-3 text-base text-gray-300">
              {isBike && (
                <>
                  <p>
                    <span className="font-semibold text-white">
                      Моторын багтаамж:
                    </span>{" "}
                    {(item as Bike).cc}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Хүч:</span>{" "}
                    {(item as Bike).power}
                  </p>
                </>
              )}
              <p>
                <span className="font-semibold text-white">Үнэ:</span>{" "}
                {item.price?.toLocaleString()}₮
              </p>
              {item.details && (
                <p>
                  <span className="font-semibold text-white">Тайлбар:</span>{" "}
                  {item.details}
                </p>
              )}
            </div>
          </div>
        </div>
        {isOpen && (
          <Lightbox
            mainSrc={activeImage || ""}
            nextSrc={isBike ? images[nextIndex] : undefined}
            prevSrc={isBike ? images[prevIndex] : undefined}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={
              isBike ? () => setActiveImage(images[prevIndex]) : undefined
            }
            onMoveNextRequest={
              isBike ? () => setActiveImage(images[nextIndex]) : undefined
            }
          />
        )}
      </div>
    </div>
  );
};

export default BikeDetailPage;
