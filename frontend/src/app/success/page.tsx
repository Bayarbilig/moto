"use client";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Head from "next/head";

const SuccessPage = () => {
  const { t } = useTranslation("success");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#1E1E1E] text-white">
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content={t("meta_description")} />
      </Head>

      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-3">{t("heading")}</h1>
        <p className="text-gray-400 mb-6">{t("description")}</p>
        <Link href="/">{t("back_home")}</Link>
      </div>
    </div>
  );
};

export default SuccessPage;
