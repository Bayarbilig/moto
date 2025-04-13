"use client";
import Image from "next/image";

// Bike type
type Bike = {
  title: string;
  model: string;
  cc: string;
  power: string;
  image: string;
};

// Bike data (same as in BrandTabs)
const bikeData: Record<string, Bike[]> = {
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
};

const Page = () => {
  // Бүх брэндийн мотоциклуудыг нэг массив болгох
  const allBikes = Object.values(bikeData).flat();

  return (
    <div className="min-h-screen bg-black text-white px-4 py-32">
      <h1 className="text-4xl font-bold text-center mb-10 text-[#F95F19]">
        Бүх мотоциклууд
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {allBikes.map((bike, index) => (
          <div
            key={index}
            className="bg-[#1a1a1a] p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="relative w-full h-56 mb-4">
              <Image
                src={bike.image}
                alt={bike.title}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h2 className="text-xl font-semibold text-[#F95F19] mb-1">
              {bike.title}
            </h2>
            <p className="text-sm text-gray-400 mb-2">{bike.model}</p>
            <div className="flex justify-between text-sm text-gray-300">
              <span>Моторын багтаамж: {bike.cc}</span>
              <span>Хурд: {bike.power}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
