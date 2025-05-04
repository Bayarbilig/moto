"use client";
import Image from "next/image";
import { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// Define types for bikes and data structure
type Bike = {
  title: string;
  model: string;
  cc: string;
  power: string;
  image: string;
};

type BikeData = {
  harley: Bike[];
  yamaha: Bike[];
  kawasaki: Bike[];
  husqvarna: Bike[];
  ducati: Bike[];
};

// Define the actual data
const bikeData: BikeData = {
  harley: [
    {
      title: "Harley Davidson Softail",
      model: "2013 HARLEY DAVIDSON 883",
      cc: "1200CC",
      power: "103 кВт/ц",
      image: "/bike.png",
    },
    {
      title: "Harley Davidson Street 750",
      model: "2015 HARLEY STREET 750",
      cc: "749CC",
      power: "47 кВт/ц",
      image: "/bike2.png",
    },
    {
      title: "Harley Davidson Iron 1200",
      model: "2019 HARLEY IRON 1200",
      cc: "1202CC",
      power: "66 кВт/ц",
      image: "/bike3.png",
    },
  ],
  yamaha: [
    {
      title: "Yamaha R1",
      model: "2020 YAMAHA R1",
      cc: "998CC",
      power: "147 кВт/ц",
      image: "/bike2.png",
    },
    {
      title: "Yamaha MT-07",
      model: "2022 YAMAHA MT-07",
      cc: "689CC",
      power: "55 кВт/ц",
      image: "/bike.png",
    },
    {
      title: "Yamaha XSR900",
      model: "2023 YAMAHA XSR900",
      cc: "890CC",
      power: "87 кВт/ц",
      image: "/bike3.png",
    },
  ],
  kawasaki: [
    {
      title: "Kawasaki Ninja ZX-10R",
      model: "2019 KAWASAKI ZX-10R",
      cc: "998CC",
      power: "149 кВт/ц",
      image: "/bike3.png",
    },
    {
      title: "Kawasaki Z900",
      model: "2021 KAWASAKI Z900",
      cc: "948CC",
      power: "92 кВт/ц",
      image: "/bike2.png",
    },
    {
      title: "Kawasaki Vulcan S",
      model: "2022 KAWASAKI VULCAN S",
      cc: "649CC",
      power: "45 кВт/ц",
      image: "/bike.png",
    },
  ],
  husqvarna: [
    {
      title: "Husqvarna Svartpilen 701",
      model: "2021 HUSQVARNA SVARTPILEN",
      cc: "692CC",
      power: "55 кВт/ц",
      image: "/bike.png",
    },
    {
      title: "Husqvarna Vitpilen 401",
      model: "2020 HUSQVARNA VITPILEN",
      cc: "373CC",
      power: "33 кВт/ц",
      image: "/bike2.png",
    },
    {
      title: "Husqvarna Norden 901",
      model: "2023 HUSQVARNA NORDEN",
      cc: "889CC",
      power: "77 кВт/ц",
      image: "/bike3.png",
    },
  ],
  ducati: [
    {
      title: "Husqvarna Svartpilen 701",
      model: "2021 HUSQVARNA SVARTPILEN",
      cc: "692CC",
      power: "55 кВт/ц",
      image: "/bike.png",
    },
    {
      title: "Husqvarna Vitpilen 401",
      model: "2020 HUSQVARNA VITPILEN",
      cc: "373CC",
      power: "33 кВт/ц",
      image: "/bike2.png",
    },
    {
      title: "Husqvarna Norden 901",
      model: "2023 HUSQVARNA NORDEN",
      cc: "889CC",
      power: "77 кВт/ц",
      image: "/bike3.png",
    },
    {
      title: "Husqvarna Norden 901",
      model: "2023 HUSQVARNA NORDEN",
      cc: "889CC",
      power: "77 кВт/ц",
      image: "/bike3.png",
    },
  ],
};

export const BrandTabs = () => {
  const brands = [
    { id: 1, name: "HARLEY DAVIDSON", slug: "harley" },
    { id: 2, name: "YAMAHA", slug: "yamaha" },
    { id: 3, name: "KAWASAKI", slug: "kawasaki" },
    { id: 4, name: "HUSQVARNA", slug: "husqvarna" },
    { id: 5, name: "DUCATI", slug: "ducati" },
  ] as const;

  type BrandSlug = (typeof brands)[number]["slug"];

  const [activeTab, setActiveTab] = useState<BrandSlug>("harley");
  const [bikeIndex, setBikeIndex] = useState(0);
  const bikes = bikeData[activeTab];
  const bike = bikes[bikeIndex];
  const router = useRouter();

  const handlePrev = () => {
    setBikeIndex((prev) => (prev === 0 ? bikes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setBikeIndex((prev) => (prev === bikes.length - 1 ? 0 : prev + 1));
  };

  const changeTab = (slug: BrandSlug) => {
    setActiveTab(slug);
    setBikeIndex(0);
  };

  return (
    <div className="gradient">
      <div className="flex justify-center pt-12">
        <div className="flex overflow-x-auto no-scrollbar space-x-4">
          {brands.map((brand) => (
            <button
              key={brand.id}
              className={`brand-tab ${
                activeTab === brand.slug ? "active" : ""
              } whitespace-nowrap px-4 py-2`}
              onClick={() => changeTab(brand.slug)}
            >
              {brand.name}
            </button>
          ))}
        </div>
      </div>

      <section>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative pt-24">
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-8 absolute text-white w-full justify-center top-12">
            {bike.title}
          </h2>

          <div className="flex flex-col md:flex-row justify-evenly items-center px-8 md:px-32">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="p-2 bg-[#F95F19] rounded-full h-fit shadow-md hover:shadow-lg active:shadow-sm transition hover:bg-orange-500"
            >
              <BiChevronLeft size={24} className="text-black" />
            </motion.button>

            <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={bike.image}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="absolute w-full h-full"
                >
                  <Image
                    src={bike.image}
                    alt={bike.title}
                    width={600}
                    height={600}
                    quality={100}
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="p-2 bg-[#F95F19] rounded-full h-fit shadow-md hover:shadow-lg active:shadow-sm transition hover:bg-orange-500"
            >
              <BiChevronRight size={24} className="text-black" />
            </motion.button>
          </div>

          <motion.div
            key={bike.model}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-moto-dark/70 backdrop-blur-sm p-4 rounded mt-6 absolute bottom-0 left-32 "
          >
            <p className="uppercase text-xs text-gray-400">МОТОЦИКЛ</p>
            <h3 className="text-xl font-bold text-white">{bike.model}</h3>

            <div className="flex items-center mt-2 space-x-2">
              <div className="text-sm">
                <span className="text-gray-400">Моторын багтаамж:</span>
                <span className="text-white ml-2">{bike.cc}</span>
              </div>
              <span className="text-gray-500">•</span>
              <div className="text-sm">
                <span className="text-gray-400">Хурд:</span>
                <span className="text-white ml-2">{bike.power}</span>
              </div>
            </div>

            <div className="flex mt-4 items-center space-x-2">
              {bikes.map((_, index: number) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === bikeIndex ? "bg-[#F95F19]" : "bg-white/30"
                  }`}
                ></div>
              ))}
            </div>
          </motion.div>
          <div
            className="absolute right-32 bottom-12 text-[#F95F19] cursor-pointer hover:text-orange-500 transition duration-300"
            onClick={() => router.push("/bike")}
          >
            Бүгдийг үзэх
          </div>
        </div>
      </section>
    </div>
  );
};
