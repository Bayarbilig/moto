"use client";

import Image from "next/image";

import { useTranslation } from "react-i18next";
import { Bike } from "../Types";

export default function BikeCard({
  bike,
  onClick,
}: {
  bike: Bike;
  onClick: () => void;
}) {
  const { t } = useTranslation("bikes");
  return (
    <div
      className="bg-[#1a1a1a] p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-full h-56 mb-4 rounded overflow-hidden">
        <Image src={bike.image} alt={bike.title} fill className="object-cover" />
      </div>
      <h3 className="text-lg font-semibold text-[#F95F19] truncate mb-1">
        {bike.title}
      </h3>
      <p className="text-sm text-gray-400">
        {bike.bikeModel} • {t("cc")}: {bike.cc}
      </p>
      <p className="text-sm text-gray-300">
        {t("power")}: {bike.power}
      </p>
      <p className="text-sm text-gray-300">
        {t("price")}: {bike.price?.toLocaleString() ?? t("notAvailable")}₮
      </p>
      <p className="text-sm text-gray-300">
        {t("mileage")}: {bike.mileage?.toLocaleString() ?? "-"} км
        </p>
    </div>
  );
}
