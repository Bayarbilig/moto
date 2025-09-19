"use client";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownSection = (): JSX.Element => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const router = useRouter();
  const { t } = useTranslation("common");

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
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
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

  if (!timeLeft) return <div>{t("loading")}</div>;

  return (
    <section
      className="py-10 sm:py-16 md:py-20 bg-cover relative"
      style={{ backgroundImage: "url('/section3.png')" }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 md:px-12 text-center grid gap-10 sm:gap-16 md:gap-48">
        <h2 className="text-lg sm:text-2xl md:text-4xl font-bold mb-4 sm:mb-8 text-white leading-snug max-w-[90%] sm:w-[600px] mx-auto">
          {t("countTitle")}
        </h2>

        <div>
          <p className="text-xs sm:text-base text-gray-300 mb-4 sm:mb-10 max-w-sm sm:max-w-xl mx-auto leading-relaxed">
            {t("countdesc")}
          </p>

          {/* Countdown blocks */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 sm:mb-10">
            {[
              { value: timeLeft.days, label: t("day") },
              { value: timeLeft.hours, label: t("hour") },
              { value: timeLeft.minutes, label: t("minute") },
              { value: timeLeft.seconds, label: t("second") },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="bg-[#71717A] backdrop-blur-sm p-1 sm:p-3 w-12 sm:w-16 text-center rounded"
              >
                <div className="text-lg sm:text-3xl font-bold text-white">
                  {value}
                </div>
                <div className="text-[9px] sm:text-xs text-white">{label}</div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
            <button
              className="bg-black text-white px-4 sm:px-6 py-2 text-xs sm:text-sm rounded"
              onClick={() => router.push("/tournament")}
            >
              {t("signup")}
            </button>
            <button
              className="border-white text-white bg-[#F95F19] px-4 sm:px-6 py-2 text-xs sm:text-sm rounded"
              onClick={() => router.push("/tournament")}
            >
              {t("countdetail")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
