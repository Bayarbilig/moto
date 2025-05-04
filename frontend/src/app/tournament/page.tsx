"use client";
import EventCard from "../components/EventCard";
import { useRouter } from "next/navigation";
import { events } from "../components/mock";

const Page = () => {
  const router = useRouter();

  return (
    <div className="bg-[#1E1E1E] py-10 sm:py-16 flex justify-center items-center">
      <div className="mx-auto px-8 sm:px-6 md:px-8 max-w-7xl flex items-center justify-center">
        {/* Тайлбар хэсэг */}
        <div className="py-6 sm:py-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Мото Тэмцээн
          </h1>
          <p className="text-sm sm:text-base text-[#A1A1AA]">
            Монголын шилдэг мотоциклын тэмцээнүүд
          </p>
        </div>

        {/* Тэмцээний картууд */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {events.map((event, index) => (
            <EventCard
              key={index}
              image={event.image}
              category={event.category}
              title={event.title}
              description={event.description}
              date={event.date}
              location={event.location}
              viewButtonText={event.viewButtonText}
              applyButtonText={event.applyButtonText}
              onView={() => router.push(`/detail/${event.id}`)}
              onApply={() => router.push(`/register/${event.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
