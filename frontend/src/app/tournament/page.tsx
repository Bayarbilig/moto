"use client";
import { useCallback, useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { useRouter } from "next/navigation";
import { Event } from "../components/Types";
import { api } from "@/lib/axios";
import { useTranslation } from "next-i18next";

const Page = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter();
  const { t } = useTranslation("common");
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
      category: t("Sport-bikes"),
      createdAt: "2025-07-29T10:00:50.679Z",
      updatedAt: "2025-07-29T10:00:50.679Z",
      date: "2025-09-06",
      title: "EliteMotoGP Round 2",
      description: t("tour_des"),
      image: "./tournament.jpg",
      location: "22 Power land",
      // applyButtonText: "Apply хийх",
      viewButtonText: t("view_com"),
      roadDetailImage: "./road.jpg",
      tournamentDetail: "./types.jpg",
    },
  ];

  return (
    <div className=" py-32 bg-black ">
      <div className=" mx-auto px-4">
        <div className="py-12">
          <h1 className="text-3xl font-bold text-white mb-2 ">
            {t("moto_tournament")}
          </h1>
          <p className="text-[#A1A1AA]">{t("moto_tournament_detail")}</p>
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
