"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "@/lib/axios";
import { FaSearchPlus } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { ProductSection } from "../components/ProductSection";
import { Bike } from "../components/Types";

const BikeDetailModal = ({
  bike,
  onClose,
}: {
  bike: Bike;
  onClose: () => void;
}) => {
  const [selectedImage, setSelectedImage] = useState(
    bike.images?.[0] || bike.image
  );
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  const allImages = [bike.image, ...(bike.images || [])].filter(Boolean);

  const handleBuy = () => {
    alert(
      `Та "${bike.title}" (${selectedVariant || "анхан хувилбар"}) мотоциклийг сонголоо.`
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-[9999] overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-900 text-white p-6 rounded-lg w-full max-w-6xl mx-auto my-12 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-3xl hover:text-red-500 z-10"
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Image Gallery */}
          <div>
            <Carousel
              showThumbs
              showStatus={false}
              infiniteLoop
              useKeyboardArrows
              selectedItem={allImages.indexOf(selectedImage)}
              onChange={(i) => setSelectedImage(allImages[i])}
              className="rounded-lg overflow-hidden"
            >
              {allImages.map((img, i) => (
                <div key={i} className="relative group">
                  <Zoom>
                    <Image
                      src={img}
                      alt={`Bike ${i}`}
                      width={600}
                      height={400}
                      className="rounded-lg object-cover w-full h-72 cursor-zoom-in"
                    />
                  </Zoom>
                  <FaSearchPlus className="absolute bottom-4 right-4 text-white bg-black bg-opacity-60 rounded-full p-2 text-xl group-hover:scale-110 transition-transform" />
                </div>
              ))}
            </Carousel>
          </div>

          {/* Bike Info */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[#F95F19]">{bike.title}</h2>
            <p className="text-gray-300">{bike.bikeModel}</p>
            <div className="grid grid-cols-2 gap-2 text-sm mt-4 text-gray-300">
              <span>
                Брэнд:{" "}
                {typeof bike.brand === "object" && "name" in bike.brand
                  ? bike.brand.name
                  : "?"}
              </span>
              <span>Загвар: {bike.bikeModel || "?"}</span>
              <span>CC: {bike.cc || "?"}</span>
              <span>Хүч: {bike.power || "?"}</span>
              <span>Үнэ: {bike.price?.toLocaleString() ?? "?"} ₮</span>
              <span>Жин: {bike.weight || "?"} кг</span>
              <span>Үйлдвэрлэсэн он: {bike.year || "?"}</span>
              <span>Импортын он: {bike.importedYear || "?"}</span>
              <span>Статус: {bike.sold ? "Зарагдсан" : "Байгаа"}</span>
            </div>

            {bike.features && bike.features.length > 0 && (
              <div>
                <h4 className="text-sm text-gray-400 mt-2">Онцлог шинжүүд:</h4>
                <ul className="list-disc ml-6 text-gray-300 text-sm">
                  {bike.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {bike.variants && bike.variants.length > 0 && (
              <div>
                <h4 className="text-sm text-gray-400 mb-1">Өнгө / хувилбар:</h4>
                <div className="flex gap-2 flex-wrap">
                  {bike.variants.map((variant) => (
                    <button
                      key={variant}
                      className={`px-3 py-1 rounded-full border ${
                        selectedVariant === variant
                          ? "bg-[#F95F19] text-white"
                          : "text-gray-300 border-gray-600"
                      }`}
                      onClick={() => setSelectedVariant(variant)}
                      type="button"
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleBuy}
              className="mt-6 w-full bg-[#F95F19] hover:bg-[#e94d0f] text-white font-semibold py-2 rounded-full"
              type="button"
            >
              Худалдан авах
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/bike/bikes");
        setBikes(
          res.data.sort((a: Bike, b: Bike) => (b.year || 0) - (a.year || 0))
        );
      } catch (error) {
        console.error("Мотоцикл татахад алдаа гарлаа:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-black text-white px-4 py-24 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-[#F95F19]">
          Бүх мотоцикл
        </h1>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#1a1a1a] p-4 rounded-lg animate-pulse"
              >
                <div className="bg-gray-700 h-56 w-full rounded mb-4" />
                <div className="h-4 bg-gray-600 rounded w-2/3 mb-2" />
                <div className="h-4 bg-gray-600 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {bikes.slice(0, visibleCount).map((bike) => (
                <div
                  key={bike._id}
                  onClick={() => setSelectedBike(bike)}
                  className="bg-[#1a1a1a] p-4 rounded-xl shadow hover:shadow-lg transition duration-300 cursor-pointer"
                >
                  <div className="relative w-full h-56 mb-4 rounded overflow-hidden">
                    <Image
                      src={bike.image}
                      alt={bike.title}
                      fill
                      className="rounded object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-[#F95F19] truncate mb-1">
                    {bike.title}
                  </h2>
                  <p className="text-sm text-gray-400">{bike.bikeModel}</p>
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>CC: {bike.cc}</span>
                    <span>Хүч: {bike.power}</span>
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < bikes.length && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-6 py-2 bg-[#F95F19] hover:bg-[#e94d0f] text-white rounded-full font-semibold transition"
                  type="button"
                >
                  Цааш үзэх
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {selectedBike && (
        <BikeDetailModal
          bike={selectedBike}
          onClose={() => setSelectedBike(null)}
        />
      )}

      <ProductSection />
    </>
  );
};

export default Page;
