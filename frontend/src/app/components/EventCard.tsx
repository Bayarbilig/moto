"use client";
import React from "react";
import { BiCalendar, BiMapPin } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

interface EventCardProps {
  image: string;
  category: string;
  title: string;
  description: string;
  date: string;
  location: string;
  viewButtonText: string;
  applyButtonText: string;
  onView?: () => void;
  onApply?: () => void;
}

const EventCard = ({
  image,
  category,
  title,
  description,
  date,
  location,
  viewButtonText,
  applyButtonText,
  onView,
  onApply,
}: EventCardProps) => {
  return (
    <div className="flex flex-col md:flex-row w-full overflow-hidden rounded-lg bg-[#1E1E1E] text-white shadow-md">
      {/* Image Section */}
      <div className="w-full md:w-[340px] h-52 md:h-auto relative">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Content Section */}
      <div className="w-full p-4 md:p-6 flex flex-col bg-[#262626]">
        <div className="mb-4">
          <div className="bg-orange-500 hover:bg-orange-600 mb-3 w-fit px-3 py-1 rounded-full text-xs md:text-sm">
            {category}
          </div>
          <h1 className="text-lg md:text-2xl font-bold mb-2">{title}</h1>
          <p className="text-gray-300 mb-4 text-sm md:text-base">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-4 text-xs md:text-sm">
          <div className="flex items-center text-gray-400">
            <BiCalendar className="w-4 h-4 mr-2" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <BiMapPin className="w-4 h-4 mr-2" />
            <span>{location}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-auto">
          <button
            className="w-full sm:w-auto text-white bg-[#3F3F46] hover:bg-[#505057] px-4 py-2 rounded text-sm"
            onClick={onView}
          >
            {viewButtonText}
          </button>
          <button
            className="w-full sm:w-auto bg-[#F95F19] hover:bg-[#e25515] text-white flex items-center justify-center gap-2 px-4 py-2 rounded text-sm"
            onClick={onApply}
          >
            {applyButtonText}
            <BsArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
