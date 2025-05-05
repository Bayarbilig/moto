"use client";
import EventCard from "../components/EventCard";
import { useRouter } from "next/navigation";
import { events } from "../components/mock";

const Page = () => {
  const router = useRouter();
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
