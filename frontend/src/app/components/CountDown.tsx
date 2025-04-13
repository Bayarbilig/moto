"use client";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownSection = (): JSX.Element => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const router = useRouter();
  useEffect(() => {
    const getTimeRemaining = (): TimeLeft => {
      const storedEndDate = localStorage.getItem("countdownEndDate");

      let endDate: Date;
      if (!storedEndDate) {
        endDate = new Date();
        endDate.setDate(endDate.getDate() + 1);
        endDate.setHours(endDate.getHours() + 12);
        endDate.setMinutes(endDate.getMinutes() + 31);
        endDate.setSeconds(endDate.getSeconds() + 36);

        localStorage.setItem("countdownEndDate", endDate.getTime().toString());
      } else {
        endDate = new Date(parseInt(storedEndDate));
      }

      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    };

    setTimeLeft(getTimeRemaining());

    const interval = setInterval(() => {
      const remaining = getTimeRemaining();
      setTimeLeft(remaining);

      if (
        remaining.days === 0 &&
        remaining.hours === 0 &&
        remaining.minutes === 0 &&
        remaining.seconds === 0
      ) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) {
    return <div>Loading...</div>;
  }

  return (
    <section
      className="py-20 bg-cover relative"
      style={{
        backgroundImage: "url('/section3.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center grid gap-48">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
          Мото урамдааны гал гарсан
          <br />
          мөчүүдийг бүү алдаарай
        </h2>

        <div>
          <p className="text-gray-300 mb-10 max-w-xl mx-auto">
            Шилдэг уралдаанчид, эрсдэлтэй сорилтууд, хязгааргүй хурд – бүгд энд!
          </p>

          <div className="flex justify-center gap-4 mb-10">
            <div className="bg-[#71717A] backdrop-blur-sm p-3 w-16 text-center rounded">
              <div className="text-3xl font-bold text-white">
                {timeLeft.days}
              </div>
              <div className="text-xs text-white">Өдөр</div>
            </div>
            <div className="bg-[#71717A] backdrop-blur-sm p-3 w-16 text-center rounded">
              <div className="text-3xl font-bold text-white">
                {timeLeft.hours}
              </div>
              <div className="text-xs text-white">Цаг</div>
            </div>
            <div className="bg-[#71717A] backdrop-blur-sm p-3 w-16 text-center rounded">
              <div className="text-3xl font-bold text-white">
                {timeLeft.minutes}
              </div>
              <div className="text-xs text-white">Минут</div>
            </div>
            <div className="bg-[#71717A] backdrop-blur-sm p-3 w-16 text-center rounded">
              <div className="text-3xl font-bold text-white">
                {timeLeft.seconds}
              </div>
              <div className="text-xs text-white">Секунд</div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              className="bg-black text-white px-6 py-1"
              onClick={() => router.push("/tournament")}
            >
              Бүртгүүлэх
            </button>
            <button
              className="border-white text-white bg-[#F95F19] px-8 py-1 rounded-lg"
              onClick={() => router.push("/tournament")}
            >
              Тэмцээн мэдээлэл харах
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
