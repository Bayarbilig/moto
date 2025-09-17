"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

export default function ContactPage() {
  const { t } = useTranslation("common");

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white">
      {/* === Video Section === */}
      <div className="relative w-full h-[60vh]">
        <video
          className="w-full h-full object-cover"
          src="/Part1.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-5xl font-extrabold text-center">
            {t("how_we_work")}
          </h1>
        </div>
      </div>

      {/* === Contact Info === */}
      <div className="px-6 py-16">
        <h2 className="text-5xl font-extrabold text-center mb-16">
          {t("contact")}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* === Map === */}
          <div className="flex flex-col items-center">
            <a
              href="https://maps.app.goo.gl/ibsNtqVPrEmMBNVbA"
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-8 w-full"
            >
              <Image
                src="/googleMap.png"
                alt={t("location")}
                width={1100}
                height={700}
                className="rounded-xl shadow-2xl w-full object-cover"
              />
            </a>
            <p className="text-center text-xl">
              {t("view_on_map")}:{" "}
              <a
                href="https://maps.app.goo.gl/ibsNtqVPrEmMBNVbA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                {t("click_here")}
              </a>
            </p>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="text-3xl font-semibold mb-6">
                {t("general_info")}
              </h3>
              <ul className="space-y-4 text-xl leading-relaxed">
                <li>
                  <strong>{t("address")}:</strong> {t("location")}
                </li>
                <li>
                  <strong>{t("marketing_manager")}:</strong>{" "}
                  <a href="tel:89528282" className="text-blue-400">
                    8952-8282
                  </a>
                </li>
                <li>
                  <strong>{t("service")}:</strong>{" "}
                  <a href="tel:91913934" className="text-blue-400">
                    9191-3934
                  </a>
                </li>
                <li>
                  <strong>{t("shop")}:</strong>{" "}
                  <a href="tel:89578282" className="text-blue-400">
                    8957-8282
                  </a>
                </li>
                <li>
                  <strong>{t("feedback")}:</strong>{" "}
                  <a href="tel:91113371" className="text-blue-400">
                    9111-3371
                  </a>
                </li>
                <li>
                  <strong>{t("mail")}:</strong>{" "}
                  <a
                    href="mailto:dorjpeacekeeper7@gmail.com"
                    className="text-blue-400"
                  >
                    dorjpeacekeeper7@gmail.com
                  </a>
                </li>
              </ul>
            </div>


            <div>
              <h3 className="text-3xl font-semibold mb-4">
                {t("working_hours")}
              </h3>
              <p className="text-xl">
                <strong>{t("every_day")}:</strong> 09:00 – 19:00
              </p>

 
              <div className="mt-6 rounded-xl bg-gradient-to-r from-red-500 to-red-600 p-[1px] shadow-lg max-w-md">
                <div className="rounded-xl bg-gray-900 px-6 py-4 flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01M12 5a7 7 0 100 14a7 7 0 000-14z"
                    />
                  </svg>
                  <span className="text-lg font-medium">
                    {t("monday_closed")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
