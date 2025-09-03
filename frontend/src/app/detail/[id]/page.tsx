"use client";
import { api } from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiMapPin } from "react-icons/bi";
import { CgLock } from "react-icons/cg";
import { FaUserSecret } from "react-icons/fa";
import { LiaCalendarDaySolid } from "react-icons/lia";
import { Event } from "@/app/components/Types";
import { section } from "framer-motion/client";
// Fake data for demonstration (normally fetch from API)

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        const res = await api.get<Event>(`/api/event/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.error("Event fetch error:", error);
      } finally {
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
        <p>Тэмцээн олдсонгүй...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Header Banner */}
      <div
        className="relative h-[450px] bg-cover bg-center"
        style={{ backgroundImage: `url('/tournament.jpg')` }}
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
              <CgLock size={18} /> 08:00 - 17:30
            </div>
            <div className="flex items-center gap-2">
              <BiMapPin size={18} /> {event.location}
            </div>
            {/* <div className="flex items-center gap-2">
              <FaUserSecret size={18} /> 75 оролцогч
            </div> */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-2">Тэмцээний тухай</h2>
            <p className="text-gray-300">{event.description}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Хөтөлбөр</h2>
            <ul className="space-y-2 text-gray-200">
              {[
                "08:00 - Бүртгэл эхэлнэ",
                "08:00 - 09:30 - Зам үзнэ",
                "09:30 - 10:00 - Сонирхогчдын ангилал",
                "10:00 - 10:30 - 400cc",
                "10:30 - 11:00 - 600cc",
                "11:00 - 11:30 - 1000cc",
                "11:30 - 12:00 - Super moto naked",
                "12:00 - 12:30 - Stunt",
                "12:30 - 13:30 - Нээлт (Тамирчны алдар, Limit king, Ginjin, Moon dance, хөтлөгч, Drift car үзүүлбэр, Солиут)",
                "13:30 - 14:00 - Сонирхогчдын ангилал",
                "14:00 - 14:30 - 400cc",
                "14:30 - 15:00 - 600cc",
                "15:00 - 15:30 - 1000cc",
                "15:30 - 16:00 - Super moto naked",
                "16:00 - 16:30 - Stunt",
                "16:30 - 17:00 - Эмэгтэй ангилал",
                "17:00 - 17:30 - Хаалт",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold">{i + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">Замын дэлгэрэнгүй</h2>
            <div className="overflow-x-auto">
              <img
                src={"/road.jpg"}
                alt="Road Detail"
                className="w-full rounded"
              />
            </div>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">Ангилал</h2>
            <div className="space-y-3">
              {[
                "MotoGP bike 1000cc-1400cc",
                "MotoGP bike 600cc-954cc",
                "MotoGP bike 125cc-594cc",
                "Эмэгтэй",
                "Naked Bike / Supermoto",
                "Сонирхогчид",
                "Stunt Moto",
                "18-аас доош насны тамирчид",
              ].map((cat, i) => (
                <div
                  key={i}
                  className="bg-neutral-800 px-4 py-2 rounded flex items-center gap-2"
                >
                  <span className="text-orange-400">➤</span>
                  {cat}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Шагнал</h2>
            <ul className="text-gray-200 space-y-2">
              {/* MotoGP bike 1000cc-1400cc */}
              <li className="font-semibold text-white">
                MotoGP bike 1000cc-1400cc
                <ul className="pl-5 space-y-1 font-normal text-gray-300">
                  <li>🥇 1-р байр: 2,000,000₮</li>
                  <li>🥈 2-р байр: 1,000,000₮</li>
                  <li>🥉 3-р байр: 700,000₮</li>
                </ul>
              </li>

              {/* MotoGP bike 600cc-954cc */}
              <li className="font-semibold text-white">
                MotoGP bike 600cc-954cc
                <ul className="pl-5 space-y-1 font-normal text-gray-300">
                  <li>🥇 1-р байр: 2,000,000₮</li>
                  <li>🥈 2-р байр: 1,000,000₮</li>
                  <li>🥉 3-р байр: 700,000₮</li>
                </ul>
              </li>

              {/* MotoGP bike 125cc-556cc */}
              <li className="font-semibold text-white">
                MotoGP bike 125cc-556cc
                <ul className="pl-5 space-y-1 font-normal text-gray-300">
                  <li>🥇 1-р байр: 2,000,000₮</li>
                  <li>🥈 2-р байр: 1,000,000₮</li>
                  <li>🥉 3-р байр: 700,000₮</li>
                </ul>
              </li>

              {/* Эмэгтэй */}
              <li className="font-semibold text-white">
                Эмэгтэй
                <ul className="pl-5 space-y-1 font-normal text-gray-300">
                  <li>🥇 1-р байр: 2,000,000₮</li>
                  <li>🥈 2-р байр: 1,000,000₮</li>
                  <li>🥉 3-р байр: 700,000₮</li>
                </ul>
              </li>

              {/* Naked Bike & Supermoto */}
              <li className="font-semibold text-white">
                Naked Bike & Supermoto
                <ul className="pl-5 space-y-1 font-normal text-gray-300">
                  <li>🥇 1-р байр: 2,000,000₮</li>
                  <li>🥈 2-р байр: 1,000,000₮</li>
                  <li>🥉 3-р байр: 700,000₮</li>
                </ul>
              </li>

              {/* Stunt Moto */}
              <li className="font-semibold text-white">
                Stunt Moto
                <ul className="pl-5 space-y-1 font-normal text-gray-300">
                  <li>🥇 1-р байр: 2,000,000₮</li>
                  <li>🥈 2-р байр: 1,000,000₮</li>
                  <li>🥉 3-р байр: 700,000₮</li>
                </ul>
              </li>

              {/* Анхлан сонирхогчид */}
              <li className="font-semibold text-white">
                Анхлан сонирхогчид
                <ul className="pl-5 space-y-1 font-normal text-gray-300">
                  <li>🥇 1-р байр: Motocycle 125cc</li>
                  <li>🥈 2-р байр: 1,000,000₮</li>
                  <li>🥉 3-р байр: 700,000₮</li>
                </ul>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              Бүртгүүлэх холбоос болон Taкс
            </h2>
            <ul className="text-gray-200 space-y-2 list-disc list-inside">
              <li>Утас: 91113371, 89528282</li>
              <li>Такс: 200,000₮</li>
              {/* <li>Жолооны үнэмлэхтэй байх</li>
              <li>Эрүүл мэндийн үзлэгт орсон байх</li> */}
            </ul>
          </section>

          {/* <button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded"
            onClick={() => router.push(`/register/${event._id}`)}
          >
            Бүртгүүлэх
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
