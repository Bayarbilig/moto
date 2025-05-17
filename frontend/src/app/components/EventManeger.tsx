import React from "react";
import { BiTrash } from "react-icons/bi";
import { Event } from "./Types";

type EventManagerProps = {
  events: Event[];
  onDeleteEvent: (_id: string) => void;
};

export const EventManeger = ({ events, onDeleteEvent }: EventManagerProps) => {
  return (
    <div className="flex-1 grid h-fit text-white">
      <label className="mb-1">Delete Equipment</label>
      <div
        className="max-h-[240px] overflow-auto scrollbar-thin scrollbar-thumb-[#e15617] scrollbar-track-[#222] rounded"
        style={{
          scrollbarColor: "#e15617 #222",
          scrollbarWidth: "thin",
        }}
      >
        {events.map((item, index) => (
          <div
            onClick={() => item._id && onDeleteEvent(item._id)}
            key={index}
            className="border border-gray-700 px-4 w-full py-2 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              {item.image && (
                <img src={item.image} alt={item.title} className="w-16 h-16" />
              )}
              <p>{item.title}</p>
            </div>
            <BiTrash />
          </div>
        ))}
      </div>
    </div>
  );
};
