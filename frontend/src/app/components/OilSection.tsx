// src/components/OilSection.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motoOils } from "@/data/motoOils";
import { MotoOilCard } from "./MotoOilCard";
import { MotoOilModal } from "./MotoOilModal";
import { MotoOil } from "./Types";

export const OilSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);


  const [selectedOil, setSelectedOil] = useState<MotoOil | null>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let index = 0;
    const scrollInterval = setInterval(() => {
      const children = container.children;
      if (!children.length) return;

      index = (index + 1) % children.length;
      const child = children[index] as HTMLElement;
      container.scrollTo({
        left: child.offsetLeft,
        behavior: "smooth",
      });
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <section className="py-10 px-4 bg-gray-100" id="oil">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Мотоциклийн зориулалтын тоснууд
      </h2>

      {/* Mobile carousel */}
      <div className="block md:hidden">
        <div
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 pb-2 -mx-4 scrollbar-hide"
          ref={scrollRef}
        >
          {motoOils.map((oil) => (
            <div
              key={oil.name}
              className="snap-center shrink-0 w-[85%]"
              onClick={() => setSelectedOil(oil)}
            >
              <MotoOilCard {...oil} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {motoOils.map((oil) => (
          <MotoOilCard
            key={oil.name}
            {...oil}
            onClick={() => setSelectedOil(oil)}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedOil && (
        <MotoOilModal oil={selectedOil} onClose={() => setSelectedOil(null)} />
      )}
    </section>
  );
};
