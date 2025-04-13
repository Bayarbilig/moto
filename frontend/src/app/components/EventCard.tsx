"use client";
import { useRouter } from "next/navigation";
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
    <div className="flex flex-col md:flex-row w-full overflow-hidden rounded-lg  text-white ">
      {/* Image Section */}
      <div className=" md:h-auto relative">
        <img
          src={image}
          alt={title}
          className="w-[344px] h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="md:w-3/5 p-6 flex flex-col bg-[#262626] ">
        <div className="mb-4">
          <div className="bg-orange-500 hover:bg-orange-600 mb-4 w-fit px-4 rounded-full">
            {category}
          </div>
          <h1 className="text-3xl font-bold mb-3">{title}</h1>
          <p className="text-gray-300 mb-6">{description}</p>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center text-gray-300">
            <BiCalendar className="w-5 h-5 mr-2" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <BiMapPin className="w-5 h-5 mr-2" />
            <span>{location}</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-between mt-auto gap-4">
          <button
            className="text-white border-gray-600 bg-[#3F3F46] px-4 py-1 rounded-[4px] hover:text-white"
            onClick={onView}
          >
            {viewButtonText}
          </button>
          <button
            className="bg-[#F95F19] text-white flex items-center gap-2 px-4 py-1 rounded-[4px]"
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
