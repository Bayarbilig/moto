"use client";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useRef } from "react";

export const ProductSection = () => {
  const accessoriesRef = useRef<HTMLDivElement>(null);
  const equipmentRef = useRef<HTMLDivElement>(null);

  const scrollAccessories = (direction: "left" | "right") => {
    const container = accessoriesRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.75; // Scroll by 75% of the container width for a smoother experience
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollEquipment = (direction: "left" | "right") => {
    const container = equipmentRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.75; // Same as above
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const accessories = [
    {
      id: 1,
      image: "tool1.png",
      price: "₮155000", // Added price
      brand: "МАСКА",
      name: "FOX JERSEY",
    },
    {
      id: 2,
      image: "tool2.png",
      price: "₮155000", // Added price
      brand: "МОТОЦИКЛ ХЭРЭГСЭЛ",
      name: "2017 HUSQVARNA",
      model: "FX450 4T",
    },
    {
      id: 3,
      image: "tool3.png",
      price: "₮155000", // Added price
      brand: "ХАСЕЛГ",
      name: "2013 HARLEY DAVIDSON",
      model: "883",
    },
    {
      id: 4,
      image: "tool3.png",
      price: "₮155000", // Added price
      brand: "ХАСЕЛГ",
      name: "2013 HARLEY DAVIDSON",
      model: "883",
    },
    {
      id: 5,
      image: "tool3.png",
      price: "₮155000", // Added price
      brand: "ХАСЕЛГ",
      name: "2013 HARLEY DAVIDSON",
      model: "883",
    },
    {
      id: 6,
      image: "tool3.png",
      price: "₮1550000", // Added price
      brand: "ХАСЕЛГ",
      name: "2013 HARLEY DAVIDSON",
      model: "883",
    },
  ];

  const equipment = [
    {
      id: 1,
      image: "tool4.png",
      price: "₮155000", // Added price
      brand: "МАСКА",
      name: "FOX JERSEY",
    },
    {
      id: 2,
      image: "tool5.png",
      price: "₮155000", // Added price
      brand: "МОТОЦИКЛ ХЭРЭГСЭЛ",
      name: "2017 HUSQVARNA",
      model: "FX450 4T",
    },
    {
      id: 3,
      image: "tool6.png",
      price: "₮155000", // Added price
      brand: "ХАСЕЛГ",
      name: "2013 HARLEY DAVIDSON",
      model: "883",
    },
    {
      id: 4,
      image: "tool3.png",
      price: "₮155000", // Added price
      brand: "ХАСЕЛГ",
      name: "2013 HARLEY DAVIDSON",
      model: "883",
    },
    {
      id: 5,
      image: "tool3.png",
      price: "₮155000", // Added price
      brand: "ХАСЕЛГ",
      name: "2013 HARLEY DAVIDSON",
      model: "883",
    },
    {
      id: 6,
      image: "tool3.png",
      price: "₮155000", // Added price
      brand: "ХАСЕЛГ",
      name: "2013 HARLEY DAVIDSON",
      model: "883",
    },
  ];

  return (
    <section
      className="py-16 bg-moto-dark bg-cover gap-32 grid py-24"
      style={{ backgroundImage: "url('/section2.png')" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-xl md:text-2xl font-bold mb-8 text-white">
          Мотоциклийн сэлбэг
        </h2>

        {/* Accessories Section */}
        <div className="relative">
          <div
            ref={accessoriesRef}
            className="flex space-x-6 overflow-x-auto scroll-smooth scrollbar-hide pb-6"
          >
            {accessories.map((product) => (
              <div
                key={product.id}
                className="min-w-[260px] bg-moto-gray rounded-md overflow-hidden flex-shrink-0"
              >
                <div className="relative h-48 overflow-hidden border-b mb-2 border-gray-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-3 bg-[#F95F19] w-fit transform -skew-x-12">
                    <span className="product-price text-white py-2 px-3">
                      {product.price}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-400 text-xs md:text-sm uppercase">
                    {product.brand}
                  </p>
                  <h3 className="text-white font-bold mt-1 text-sm md:text-base">
                    {product.name}
                    {product.model && ` ${product.model}`}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => scrollAccessories("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 p-2 bg-[#F95F19] rounded-full hidden md:block"
          >
            <BiChevronLeft size={24} className="text-white" />
          </button>
          <button
            onClick={() => scrollAccessories("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 p-2 bg-[#F95F19] rounded-full hidden md:block"
          >
            <BiChevronRight size={24} className="text-white" />
          </button>
        </div>
      </div>

      {/* Equipment Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-xl md:text-xl font-bold mb-8 text-white">
          Мотоциклийн багаж хэрэгсэл
        </h2>

        <div className="relative">
          <div
            ref={equipmentRef}
            className="flex space-x-6 overflow-x-auto scroll-smooth scrollbar-hide pb-6"
          >
            {equipment.map((product) => (
              <div
                key={product.id}
                className="min-w-[260px] bg-moto-gray rounded-md overflow-hidden flex-shrink-0"
              >
                <div className="relative h-48 overflow-hidden border-b mb-2 border-gray-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-3 bg-[#F95F19] w-fit transform -skew-x-12">
                    <span className="product-price text-white py-2 px-3">
                      {product.price}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-400 text-xs md:text-sm uppercase">
                    {product.brand}
                  </p>
                  <h3 className="text-white font-bold mt-1 text-sm md:text-base">
                    {product.name}
                    {product.model && ` ${product.model}`}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => scrollEquipment("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 p-2 bg-[#F95F19] rounded-full hidden md:block"
          >
            <BiChevronLeft size={24} className="text-white" />
          </button>
          <button
            onClick={() => scrollEquipment("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 p-2 bg-[#F95F19] rounded-full hidden md:block"
          >
            <BiChevronRight size={24} className="text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};
