// src/components/MotoOilCard.tsx
import React from "react";

interface MotoOilCardProps {
  name: string;
  description: string;
  usage: string;
  images: string[];
  onClick?: () => void;
}

export const MotoOilCard: React.FC<MotoOilCardProps> = ({
  name,
  description,
  usage,
  images,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white shadow-md rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition"
    >
      <img
        src={images[0]}
        alt={name}
          className="w-full aspect-video object-contain bg-white"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-red-600">{name}</h3>
        <p className="text-gray-700 text-sm mt-1 truncate">{description}</p>
        <p className="text-xs text-gray-500 mt-1 italic truncate">{usage}</p>
      </div>
    </div>
  );
};
