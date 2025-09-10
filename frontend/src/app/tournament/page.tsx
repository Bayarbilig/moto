"use client";
import { useCallback, useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { useRouter } from "next/navigation";
import { Event } from "../components/Types";
import { api } from "@/lib/axios";

const Page = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter();
  const fetchEvents = useCallback(async () => {
    try {
      const res = await api.get("/api/event");
      setEvents(res.data);
    } catch (error) {
      console.error("Failed to fetch accessories:", error);
    }
  }, []);
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);
  const mockEvents = [
    {
      _id: "68889bd21ae0f631ccbecebd",
      category: "Sport Bike",
      createdAt: "2025-07-29T10:00:50.679Z",
      updatedAt: "2025-07-29T10:00:50.679Z",
      date: "2025-09-06",
      title: "EliteMotoGP Round 2",
      description:
        "Элит MotoGP тэмцээний 2-р тойрог 9-р сарын 06-нд Power land дээр болно! Өндөр хурд, нарийн ур чадвар, мото спортын оргил тулаанууд таныг хүлээж байна!",
      image: "./tournament.jpg",
      location: "22 Power land",
      // applyButtonText: "Apply хийх",
      viewButtonText: "Тэмцээн харах",
      roadDetailImage: "./road.jpg",
      tournamentDetail: "./types.jpg",
    },
  ];

  return (
    <div className=" py-32 bg-[#1E1E1E] ">
      <div className=" mx-auto px-4">
        <div className="py-12">
          <h1 className="text-3xl font-bold text-white mb-2 ">Мото Тэмцээн</h1>
          <p className="text-[#A1A1AA]">
            Монголын шилдэг мотоциклын тэмцээнүүд
          </p>
        </div>
        <div className="grid gap-10  ">
          {mockEvents.map((event, index) => (
            <EventCard
              key={index}
              image={event.image}
              category={event.category}
              title={event.title}
              description={event.description}
              date={event.date}
              location={event.location}
              viewButtonText={event.viewButtonText}
              // applyButtonText={event.applyButtonText}
              onView={() => router.push(`/detail/${event._id}`)}
              // onApply={() => router.push(`/register/${event._id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
