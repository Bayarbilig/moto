"use client";

import { Bike } from "../Types";
import Image from "next/image";
import { FaSearchPlus } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useState, type ComponentType } from "react";
import dynamic from "next/dynamic";
import type { CarouselProps } from "react-responsive-carousel";

// Dynamic import of Carousel without SSR
const Carousel = dynamic(() =>
  import("react-responsive-carousel").then(
    (mod) => mod.Carousel as ComponentType<Partial<CarouselProps>>
  ),
  { ssr: false }
);

import "react-responsive-carousel/lib/styles/carousel.min.css"; // ✅ You must import styles

export default function BikeDetailModal({
  bike,
  onClose,
}: {
  bike: Bike;
  onClose: () => void;
}) {
  const { t } = useTranslation("bikes");
  const [selectedImage, setSelectedImage] = useState<string>(
    bike.images?.[0] || bike.image
  );

  const fuelLabels: Record<string, string> = {
    gasoline: t("fuel.gasoline"),
    diesel: t("fuel.diesel"),
    electric: t("fuel.electric"),
    hybrid: t("fuel.hybrid"),
  };

  const statusLabels: Record<string, string> = {
    available: t("status.available"),
    sold: t("status.sold"),
    reserved: t("status.reserved"),
  };

  const images = [bike.image, ...(bike.images ?? [])].filter(
    (img): img is string => typeof img === "string"
  );

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 text-white p-6 rounded-xl max-w-5xl w-full max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="text-white float-right text-2xl">
          &times;
        </button>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* Carousel Section */}
          <div className="w-full">
            <Carousel
              selectedItem={images.indexOf(selectedImage)}
              onChange={(i) => setSelectedImage(images[i])}
              showThumbs={true}
              showIndicators={false}
              infiniteLoop={true}
              showArrows={true}
              autoPlay={false}
            >
              {images.map((img, idx) => (
                <div key={idx} className="relative w-full aspect-video">
                  <Image
                    src={img}
                    alt={bike.title}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <FaSearchPlus className="absolute bottom-2 right-2 text-white bg-black bg-opacity-60 rounded-full p-1" />
                </div>
              ))}
            </Carousel>
          </div>

          {/* Info Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{bike.title}</h2>
            <p className="text-gray-300">{bike.bikeModel}</p>
            <ul className="grid grid-cols-2 gap-2 text-sm text-gray-400">
              <li>{t("cc")}: {bike.cc}</li>
              <li>{t("power")}: {bike.power}</li>
              <li>
                {t("price")}: {bike.price?.toLocaleString() ?? t("notAvailable")} ₮
              </li>
              <li>
                {t("mileage")}: {bike.mileage?.toLocaleString() ?? t("notAvailable")} км
              </li>
              <li>{t("originCountry")}: {bike.originCountry}</li>
              <li>
                {t("fuelType")}: {bike.fuelType ? fuelLabels[bike.fuelType] : t("notAvailable")}
              </li>
              <li>
                {t("status")}: {bike.status ? statusLabels[bike.status] : t("notAvailable")}
              </li>
              <li>
                {t("soldDate")}:{" "}
                {bike.soldDate
                  ? new Date(bike.soldDate).toLocaleDateString("mn-MN")
                  : "-"}
              </li>
              <li>{t("views")}: {bike.views}</li>
              <li>{t("likes")}: {bike.likes}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
