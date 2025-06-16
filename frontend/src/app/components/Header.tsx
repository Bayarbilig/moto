"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RiUser3Line } from "react-icons/ri";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState<boolean | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const myToken = localStorage.getItem("token");
    setToken(!!myToken);
  }, []);

  const navigate = (path: string) => {
    router.push(path);
    setMenuOpen(false);
  };

  if (token === null) return null;

  const navLinks = [
    { label: t("nav.bike"), path: "/bike" },
    { label: t("nav.tournament"), path: "/tournament" },
    { label: t("nav.about"), path: "/about" },
    { label: t("nav.service"), path: "/service" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-moto-gray/80 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Image width={100} height={45} alt="logo" src="/logo.png" />
          <span className="text-white text-xl font-bold">Elite Moto</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, path }) => (
            <p
              key={path}
              className="text-white hover:text-[#F95F19] transition-colors duration-300 cursor-pointer"
              onClick={() => navigate(path)}
            >
              {label}
            </p>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          {!token ? (
            <>
              <div
                className={`cursor-pointer border border-[#F95F19] px-4 py-2 rounded-sm ${
                  pathname === "/login"
                    ? "bg-[#F95F19]/90"
                    : "hover:bg-[#f95f19]"
                }`}
                onClick={() => navigate("/login")}
              >
                <p className="text-white">{t("nav.login")}</p>
              </div>
              <div
                className={`cursor-pointer border border-[#F95F19] px-4 py-2 rounded-sm ${
                  pathname === "/signup"
                    ? "bg-[#F95F19]/90"
                    : "hover:bg-[#f95f19]"
                }`}
                onClick={() => navigate("/signup")}
              >
                <p className="text-white">{t("nav.signup")}</p>
              </div>
            </>
          ) : (
            <div
              onClick={() => navigate("/profile")}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F95F19]/90 hover:bg-[#f95f19] cursor-pointer"
            >
              <RiUser3Line className="text-white text-xl" />
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <HiOutlineX className="text-white text-2xl" />
            ) : (
              <HiOutlineMenu className="text-white text-2xl" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-moto-gray/95 px-6 py-4 space-y-4">
          {navLinks.map(({ label, path }) => (
            <p
              key={path}
              className="text-white text-lg hover:text-[#F95F19] cursor-pointer"
              onClick={() => navigate(path)}
            >
              {label}
            </p>
          ))}
          <p
            className="text-white text-lg hover:text-[#F95F19] cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            {t("nav.profile")}
          </p>
          <LanguageSwitcher />
        </div>
      )}
    </header>
  );
};
