"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { BiMapPin } from "react-icons/bi";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { MdLocalPhone, MdOutlineEmail } from "react-icons/md";

export const Footer = () => {
  const { t } = useTranslation("common");
  return (
    <footer className="bg-black text-gray-300 pt-10 w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid gap-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Help Links */}
          <nav aria-label="Footer Navigation">
            <h3 className="text-white font-bold mb-4">{t("help")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/bike"
                  className="hover:text-moto-orange transition-colors"
                >
                  {t("showroom")}
                </Link>
              </li>
              <li>
                <Link
                  href="/tournament"
                  className="hover:text-moto-orange transition-colors"
                >
                  {t("tournament")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-moto-orange transition-colors"
                >
                  {t("services")}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact Info */}
          <address className="not-italic">
            <h3 className="text-white font-bold mb-4">{t("contact")}</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <MdLocalPhone size={18} />
                <span>{t("phone")}: 8957-8282</span>
              </li>
              <li className="flex items-center gap-2">
                <MdOutlineEmail size={18} />
                <a
                  href="mailto:dorjpeacekeeper7@gmail.com"
                  className="hover:text-moto-orange transition-colors"
                >
                  dorjpeacekeeper7@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <BiMapPin size={32} className="mt-1" />
                <span>{t("location")}</span>
              </li>
            </ul>
          </address>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-bold mb-4">{t("follow_us")}</h3>
            <p className="mb-4 text-sm leading-relaxed">{t("our_detail")}</p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/EliteMotoShop1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 bg-moto-gray rounded-full hover:bg-moto-orange transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 bg-moto-gray rounded-full hover:bg-moto-orange transition-colors"
              >
                <BsInstagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="p-2 bg-moto-gray rounded-full hover:bg-moto-orange transition-colors"
              >
                <BsYoutube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#A8A29E] pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>{t("all_rights_reserved")}</p>
          <p className="mt-2 md:mt-0">{t("copyright")}</p>
        </div>
      </div>

      {/* Decorative Footer Image */}
      <Image
        src="/elitemoto.png"
        alt="Elite Moto Footer Banner"
        width={1920}
        height={300}
        quality={90}
        className="w-full h-auto object-cover mt-6"
        priority
      />
    </footer>
  );
};
