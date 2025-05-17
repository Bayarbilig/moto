"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { RiUser3Line } from "react-icons/ri";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

export const Header = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigate = (path: string) => {
    router.push(path);
    setMenuOpen(false); // close mobile menu on navigation
  };
  const myToken = localStorage.getItem("token");
  const [token, setToken] = useState(false);
  useEffect(() => {
    if (myToken) {
      setToken(true);
    } else if (!myToken) {
      setToken(false);
    }
  }, [myToken]);

  const navLinks = [
    { label: "Худалдаа", path: "/bike" },
    { label: "Тэмцээн", path: "/tournament" },
    { label: "Бидний тухай", path: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-moto-gray/80 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo + Brand */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Image width={100} height={45} alt="logo" src="/logo.png" />
          <span className="text-white text-xl font-bold">Elite Moto</span>
        </div>

        {/* Desktop Nav */}
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

        {!token ? (
          <div className="hidden md:flex gap-4 ">
            <div
              className={`flex items-center justify-center cursor-pointer border border-[#F95F19] px-4 py-2 rounded-sm duration-700 ${
                pathname === "/login" ? "bg-[#F95F19]/90" : "hover:bg-[#f95f19]"
              }`}
              onClick={() => navigate("/login")}
            >
              <p className="text-white">Нэвтрэх</p>
            </div>
            <div
              className={`flex items-center justify-center border border-[#F95F19] cursor-pointer px-4 py-2 rounded-sm duration-700 ${
                pathname === "/signup"
                  ? "bg-[#F95F19]/90"
                  : "hover:bg-[#f95f19]"
              }`}
              onClick={() => navigate("/signup")}
            >
              <p className="text-white">Бүртгүүлэх</p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => navigate("/profile")}
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-[#F95F19]/90 hover:bg-[#f95f19] cursor-pointer transition-colors"
          >
            <RiUser3Line className="text-white text-xl" />
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <HiOutlineX className="text-white text-2xl" />
            ) : (
              <HiOutlineMenu className="text-white text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-moto-gray/95 backdrop-blur-sm px-6 py-4 space-y-4">
          {navLinks.map(({ label, path }) => (
            <p
              key={path}
              className="text-white text-lg hover:text-[#F95F19] transition-colors cursor-pointer"
              onClick={() => navigate(path)}
            >
              {label}
            </p>
          ))}
          <p
            className="text-white text-lg hover:text-[#F95F19] cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            Миний хуудас
          </p>
        </div>
      )}
    </header>
  );
};
