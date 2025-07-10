import React from "react";
import { BiTrash } from "react-icons/bi";
import { Event } from "./Types";

type EventManagerProps = {
  events: Event[];
  onDeleteEvent: (_id: string) => void;
};

export const EventManager = ({ events, onDeleteEvent }: EventManagerProps) => {
  return (
    <div className="flex-1">
      <h2 className="text-xl font-semibold mb-4 text-white">All Events</h2>
      <div className="max-h-[460px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#e15617] scrollbar-track-[#222] space-y-4">
        {events.map((item) => (
          <div
            key={item._id}
            onClick={() => {
              if (
                item._id &&
                confirm(`"${item.title}" нэртэй тэмцээнээ устгах уу?`)
              ) {
                onDeleteEvent(item._id);
              }
            }}
            className="group border border-gray-700 rounded-lg overflow-hidden bg-[#2a2a2a] hover:border-[#e15617] transition cursor-pointer"
          >
            <div className="flex gap-4 items-center p-4">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-48 h-48 object-cover rounded border border-gray-600"
                />
              )}
              <div className="flex-1 text-sm space-y-1 text-white">
                <p className="font-semibold">{item.title}</p>
                <p className="text-gray-400">Төрөл: {item.category}</p>
                <p className="text-gray-400">Тайлбар: {item.description}</p>
                <p className="text-gray-400">Огноо: {item.date}</p>
                <p className="text-gray-400">Байршил: {item.location}</p>
              </div>
              <BiTrash className="text-red-500 text-xl hover:scale-110 transition" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
