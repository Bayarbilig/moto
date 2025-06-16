"use client";

import { api } from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiMapPin } from "react-icons/bi";
import { CgLock } from "react-icons/cg";
import { FaUserSecret } from "react-icons/fa";
import { LiaCalendarDaySolid } from "react-icons/lia";
import { Event } from "@/app/components/Types";
import { useTranslation } from "react-i18next";

const EventDetailPage = () => {
  const { t, ready } = useTranslation("event");
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const router = useRouter();

  // Now returns array of strings or objects
  const tArray = (key: string): (string | object)[] => {
    const val = t(key, { returnObjects: true });
    return Array.isArray(val) ? val : [];
  };

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        const res = await api.get<Event>(`/api/event/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.error("Event fetch error:", error);
      }
    };

    fetchEvent();
  }, [id]);

  if (!ready) {
    return null; // or a spinner/loading UI
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
        <p>{t("notFound")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Header */}
      <div
        className="relative h-[450px] bg-cover bg-center"
        style={{ backgroundImage: `url('${event.image}')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-8">
          <span className="bg-orange-500 text-xs px-2 py-1 rounded w-fit">
            {event.category}
          </span>
          <h1 className="text-4xl font-bold mt-3">{event.title}</h1>
          <div className="flex flex-wrap gap-6 mt-4 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <LiaCalendarDaySolid size={18} /> {event.date}
            </div>
            <div className="flex items-center gap-2">
              <CgLock size={18} /> 09:00 - 17:00
            </div>
            <div className="flex items-center gap-2">
              <BiMapPin size={18} /> {event.location}
            </div>
            <div className="flex items-center gap-2">
              <FaUserSecret size={18} /> {t("participants")}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-2">{t("aboutTitle")}</h2>
            <p className="text-gray-300">
              {event.description || t("noDescription")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">{t("scheduleTitle")}</h2>
            <ul className="space-y-2 text-gray-200">
              {tArray("scheduleList").map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold">{i + 1}.</span>
                  <span>
                    {typeof item === "string" ? item : JSON.stringify(item)}{" "}
                    {/* fallback for objects */}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              {t("categoriesTitle")}
            </h2>
            <div className="space-y-3">
              {tArray("categoriesList").map((cat, i) => (
                <div
                  key={i}
                  className="bg-neutral-800 px-4 py-2 rounded flex items-center gap-2"
                >
                  <span className="text-orange-400">➤</span>
                  {typeof cat === "string" ? cat : JSON.stringify(cat)}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">{t("prizesTitle")}</h2>
            <ul className="text-gray-200 space-y-2">
              {tArray("prizesList").map((prize, i) => (
                <li key={i}>
                  {typeof prize === "string" ? prize : JSON.stringify(prize)}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              {t("requirementsTitle")}
            </h2>
            <ul className="text-gray-200 space-y-2 list-disc list-inside">
              {tArray("requirementsList").map((req, i) => (
                <li key={i}>
                  {typeof req === "string" ? req : JSON.stringify(req)}
                </li>
              ))}
            </ul>
          </section>

          <button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded"
            onClick={() => router.push(`/register/${event._id}`)}
          >
            {t("register")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
