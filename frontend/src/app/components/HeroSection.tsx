"use client";

import { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import scrollSvg from "../svgs/scrollSvg.svg";
import { useTranslation } from "next-i18next";

export const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const { t } = useTranslation("common");

  const slides = [
    {
      title: t("carouselDetail2"), // { } шаардлагагүй
      background: "/section.png",
    },
    {
      title: t("carouselDetail3"),
      background: "/moto2.jpg",
    },
    {
      title: t("carouselDetail1"),
      background: "/moto3.jpg",
    },
  ];

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].background}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[current].background})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex justify-end items-center px-6 md:px-20">
        <motion.div
          key={slides[current].title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="flex w-[640px]"
        >
          <h1 className="font-semibold text-6xl mb-4 text-white whitespace-pre-line">
            {slides[current].title}
          </h1>
        </motion.div>
      </div>

      <div className="flex justify-between absolute w-full top-[50%] px-8 md:px-24">
        <button onClick={prevSlide} className="z-40">
          <BiChevronLeft size={48} className="text-[#ff6b00]" />
        </button>
        <button onClick={nextSlide} className="z-40">
          <BiChevronRight size={48} className="text-[#ff6b00]" />
        </button>
      </div>

      <div className="flex w-full absolute bottom-6 justify-around items-end">
        <div className="flex gap-1">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                current === i ? "bg-[#ff6b00] scale-110" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-white">{t("scroll_down")}</p>
          <Image src={scrollSvg} height={60} width={10} alt="Scroll icon" />
        </div>
        <div></div>
      </div>
    </section>
  );
};
1;
