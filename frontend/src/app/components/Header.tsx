"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useTranslation } from "next-i18next";
import i18n from "../../../i18n";

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation("common");

  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll → header hide/show
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScrollY && current > 50) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { label: t("showroom"), path: "/showroom" },
    { label: t("tournament"), path: "/tournament" },
    { label: t("services"), path: "/service" },
    { label: t("contact"), path: "/contact" },
  ];

  const navigate = (path: string) => {
    router.push(path);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm shadow-md transition-transform duration-300 ease-in-out ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-2 md:py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Image
            width={130}
            height={55}
            alt="logo"
            src="/logo.png"
            className="h-[28px] w-[70px] sm:h-[35px] sm:w-[90px] lg:h-[55px] lg:w-[130px]"
          />
          <span className="text-white text-base sm:text-lg lg:text-xl font-bold">
            {t("name")}
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, path }) => (
            <p
              key={path}
              className={`cursor-pointer transition-colors duration-300 ${
                pathname === path
                  ? "text-[#F95F19]"
                  : "text-white hover:text-[#F95F19]"
              }`}
              onClick={() => navigate(path)}
            >
              {label}
            </p>
          ))}
        </nav>

        {/* Language selector + Mobile menu button */}
        <div className="flex items-center gap-3 md:gap-4">
          <select
            value={i18n.language}
            onChange={handleChange}
            className="bg-transparent text-sm md:text-base outline-none px-1 text-white"
          >
            <option value="en" className="bg-black">
              EN
            </option>
            <option value="mn" className="bg-black">
              MN
            </option>
            <option value="ru" className="bg-black">
              RU
            </option>
            <option value="ko" className="bg-black">
              KO
            </option>
            <option value="ja" className="bg-black">
              JA
            </option>
          </select>

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="md:hidden"
          >
            {menuOpen ? (
              <HiOutlineX className="text-white text-2xl" />
            ) : (
              <HiOutlineMenu className="text-white text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-sm px-6 py-4 space-y-4 md:hidden z-40">
          {navLinks.map(({ label, path }) => (
            <p
              key={path}
              className={`text-base cursor-pointer ${
                pathname === path
                  ? "text-[#F95F19]"
                  : "text-white hover:text-[#F95F19]"
              }`}
              onClick={() => navigate(path)}
            >
              {label}
            </p>
          ))}
        </div>
      )}
    </header>
  );
};
