"use client";
import { api } from "@/lib/axios";
import Image from "next/image";
import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdAdsClick } from "react-icons/md";
import { useTranslation } from "next-i18next";

type Bike = {
  _id: string;
  title: string;
  bikeModel: string;
  cc: string;
  power: string;
  images: string[];
  details: string;
  price: number;
  brand?: string;
};

type ProductType = "bike" | "accessories" | "equipment";

type Item = any;

// Separate component that uses useSearchParams
const BikeDetailContent = () => {
  const [item, setItem] = useState<Item | null>(null);
  const [related, setRelated] = useState<Item[]>([]);
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
  const { t } = useTranslation("common");

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

        // Fetch related products (same type, exclude current)
        let relatedRes;
        if (type === "bike") {
          relatedRes = await api.get(
            `/api/bike/bikes?brand=${res?.data.brand}`
          );
        } else if (type === "accessories") {
          relatedRes = await api.get(`/api/accessories`);
        } else if (type === "equipment") {
          relatedRes = await api.get(`/api/equipment`);
        }

        const filtered = relatedRes?.data?.filter((p: Item) => p._id !== id);
        setRelated(filtered.slice(0, 4)); // show 4 products
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
          className="mb-6 text-xl text-[#F95F19] flex items-center gap-1"
        >
          <IoMdArrowRoundBack className="h-full" />
          {t("back")}
        </button>

        <div className="grid md:grid-cols-2 gap-10 items-start bg-[#1a1a1a] p-6 rounded-xl shadow-xl border border-gray-800">
          {/* Image Section */}
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
                className="rounded-xl transition-transform duration-300 group-hover:scale-105"
              />

              {/* Zoom icon overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-xl">
                <MdAdsClick className="animate-pulse" size={32} />
              </div>
            </div>

            {/* Thumbnails */}
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

          {/* Details Section */}
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
                      {t("capacity")}:
                    </span>{" "}
                    {(item as Bike).cc}cc
                  </p>
                  <p>
                    <span className="font-semibold text-white">
                      {t("power")}:
                    </span>{" "}
                    {(item as Bike).power} hp
                  </p>
                </>
              )}
              <p>
                <span className="font-semibold text-white">{t("price")}:</span>{" "}
                {item.price?.toLocaleString()}₮
              </p>
              {item.details && (
                <p>
                  <span className="font-semibold text-white">
                    {t("description")}:
                  </span>{" "}
                  {item.details}
                </p>
              )}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#F95F19] mb-6">
              {t("similar_products")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p: Item) => (
                <div
                  key={p._id}
                  className="bg-[#1a1a1a] p-3 rounded-xl border border-gray-700 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => router.push(`/showroom/${p._id}?type=${type}`)}
                >
                  <div className="relative w-full h-40 rounded-lg overflow-hidden">
                    <Image
                      src={p.images?.[0] || p.image}
                      alt={p.title || p.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                  <h3 className="mt-2 text-white font-semibold text-sm">
                    {p.name || p.title}
                  </h3>
                  <p className="text-[#F95F19] font-bold">
                    {p.price?.toLocaleString()}₮
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

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

const LoadingFallback = () => {
  const { t } = useTranslation("common");
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-white text-center py-40">{t("loading")}</div>
    </div>
  );
};

const BikeDetailPage = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BikeDetailContent />
    </Suspense>
  );
};

export default BikeDetailPage;
