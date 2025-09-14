"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import { useTranslation } from "next-i18next";

type Bike = {
  brand: any;
  title: string;
  bikeModel: string;
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

export const BrandTabs = () => {
  type BrandSlug = keyof BikeData;
  const [activeTab, setActiveTab] = useState<BrandSlug>("harley");
  const [bikeIndex, setBikeIndex] = useState(0);
  const [bikeData, setBikeData] = useState<BikeData | null>(null);
  const [brands, setBrands] = useState<
    {
      id: string;
      name: string;
      slug: string;
    }[]
  >([]);
  const { t } = useTranslation("common");

  const router = useRouter();

  useEffect(() => {
    async function fetchBrands() {
      try {
        const res = await api.get("/api/brands");
        setBrands(res.data);
      } catch (err) {
        console.error("Failed to fetch brands", err);
      }
    }
    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await api.get<Bike[]>("/api/bike/bikes");

        const grouped: BikeData = brands.reduce((acc, brand) => {
          const slug = brand.slug.toLowerCase() as BrandSlug;
          acc[slug] = [];
          return acc;
        }, {} as BikeData);

        const brandIdToSlug = new Map<string, BrandSlug>();
        const brandNameToSlug = new Map<string, BrandSlug>();

        brands.forEach((brand) => {
          const slug = brand.slug.toLowerCase() as BrandSlug;
          brandIdToSlug.set(brand.id, slug);
          brandNameToSlug.set(brand.name.toLowerCase(), slug);
        });

        response.data.forEach((bike) => {
          let brandSlug: BrandSlug | undefined;

          if (typeof bike.brand === "string") {
            brandSlug =
              brandIdToSlug.get(bike.brand) ||
              brandNameToSlug.get(bike.brand.toLowerCase());
          } else if (bike.brand && typeof bike.brand === "object") {
            brandSlug =
              brandIdToSlug.get(bike.brand.id) ||
              brandNameToSlug.get(bike.brand.name?.toLowerCase() ?? "");
          }

          if (brandSlug && grouped[brandSlug]) {
            grouped[brandSlug].push(bike);
          }
        });

        setBikeData(grouped);

        const firstAvailable = Object.entries(grouped).find(
          ([_, bikes]) => bikes.length > 0
        );
        if (firstAvailable) {
          setActiveTab(firstAvailable[0] as BrandSlug);
        }
      } catch (error) {
        console.error("Failed to fetch bike data:", error);
      }
    };

    if (brands.length > 0) {
      fetchBikes();
    }
  }, [brands]);

  if (!bikeData)
    return <div className="text-center py-12">{t("loading_bikes")}</div>;

  const bikes = bikeData[activeTab] || [];

  if (bikes.length === 0)
    return <div className="text-center py-12">{t("not_fount_bikes")}</div>;

  const bike = bikes[bikeIndex];

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
          {brands.map((brand, index) => {
            const slug = brand.slug.toLowerCase() as BrandSlug;
            const hasBikes = bikeData?.[slug]?.length > 0;

            if (!hasBikes) return null;

            return (
              <button
                key={index}
                className={`brand-tab ${
                  activeTab === slug ? "active" : ""
                } whitespace-nowrap px-4 py-2`}
                onClick={() => changeTab(slug)}
              >
                {brand.name}
              </button>
            );
          })}
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
            key={bike.bikeModel}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-moto-dark/70 backdrop-blur-sm p-4 rounded mt-6 absolute bottom-0 left-32"
          >
            <p className="uppercase text-xs text-gray-400">{t("motorcycle")}</p>
            <h3 className="text-xl font-bold text-white">{bike.bikeModel}</h3>

            <div className="flex items-center mt-2 space-x-2">
              <div className="text-sm">
                <span className="text-gray-400">{t("capacity")}:</span>
                <span className="text-white ml-2">{bike.cc}</span>
              </div>
              <span className="text-gray-500">•</span>
              <div className="text-sm">
                <span className="text-gray-400">{t("speed")}:</span>
                <span className="text-white ml-2">{bike.power}</span>
              </div>
            </div>

            <div className="flex mt-4 items-center space-x-2">
              {bikes.map((_, index) => (
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
            onClick={() => router.push("/shworoom/bike")}
          >
            {t("wiew_all")}
          </div>
        </div>
      </section>
    </div>
  );
};
