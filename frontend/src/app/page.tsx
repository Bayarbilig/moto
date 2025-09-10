"use client";
import { useEffect, useState } from "react";
import About from "./components/About";
import { BrandTabs } from "./components/BrandTabs";
import { CountdownSection } from "./components/CountDown";
import { HeroSection } from "./components/HeroSection";
import { ProductSection } from "./components/ProductSection";
import { api } from "@/lib/axios";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { MdAdsClick } from "react-icons/md";

interface ShowAlertType {
  alertImage: string;
  duration: number; // in milliseconds
  is_shown: boolean;
}

export default function Home() {
  const [showAlertData, setShowAlertData] = useState<ShowAlertType>();
  const [alertVisible, setAlertVisible] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    const fetchShowAlert = async () => {
      try {
        const res = await api.get("/api/showAlert");
        const data = res.data[0];
        setShowAlertData(data);
        setAlertVisible(data?.is_shown);

        if (data?.is_shown && data?.duration) {
          setTimeout(() => {
            setAlertVisible(false);
          }, data.duration * 1000);
        }
      } catch (error) {
        console.error("Error fetching show alert:", error);
      }
    };

    fetchShowAlert();
  }, []);

  const handleClose = () => {
    setAlertVisible(false);
  };
  return (
    <div className="bg-black w-full overflow-hidden relative">
      {showAlertData?.is_shown && alertVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-75"></div>

          {/* Alert container */}
          <div className="relative mx-4 sm:mx-52 mt-12 sm:mt-12 cursor-pointer w-full max-w-md sm:max-w-6xl">
            <Image
              src={showAlertData.alertImage}
              alt="alert image"
              width={1920}
              height={1080}
              className="w-full h-auto object-cover rounded-lg"
              onClick={() => router.push("/tournament")}
            />
            <p className=" text-[32px] absolute inset-0 underline  flex items-center justify-center pointer-events-none">
              <MdAdsClick color="black" size={120} className="animate-pulse" />
            </p>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white bg-red-600 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-lg sm:text-xl font-bold hover:bg-red-700 transition"
            >
              <IoClose />
            </button>
          </div>
        </div>
      )}

      <HeroSection />
      <About />
      <BrandTabs />
      <ProductSection />
      <CountdownSection />
    </div>
  );
}
