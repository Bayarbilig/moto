"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RiUser3Line } from "react-icons/ri";
// Header Component

export const Header = () => {
  const router = useRouter();
  return (
    <header className="py-4 px-6 md:px-12 bg-moto-gray/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image width={100} height={45} alt="logo" src={"/logo.png"} />
          <div className="font-bold text-xl text-white">Elite Moto</div>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <p
            className="text-white hover:text-[#F95F19] duration-300 cursor-pointer"
            onClick={() => router.push("/bike")}
          >
            Худалдаа
          </p>
          <p
            className="text-white hover:text-[#F95F19] duration-300 cursor-pointer"
            onClick={() => router.push("/tournament")}
          >
            Тэмцээн
          </p>
          <p
            className="text-white hover:text-[#F95F19] duration-300 cursor-pointer"
            onClick={() => router.push("/about")}
          >
            Бидний тухай
          </p>
        </div>

        <button></button>
      </div>
    </header>
  );
};
