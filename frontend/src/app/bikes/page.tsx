"use client";

import { useState } from "react";

import BikeGrid from "../components/bikes/BikeGrid";
import BikeDetailModal from "../components/bikes/BikeDetailModal";
import Pagination from "../components/bikes/Pagination";
import useBikes from "../hooks/useBikes";
import { Bike } from "../components/Types";
import { useTranslation } from "react-i18next";


export default function BikePageClient() {
  const { t } = useTranslation("bikes");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { bikes, total, loading, error } = useBikes(page, search);
  const [selectedBike, setSelectedBike] = useState<null | Bike>(null);
  const totalPages = Math.ceil(total / 9);

  return (
    <div className="min-h-screen p-6 bg-black text-white">
      <h1 className="text-4xl font-bold text-center mb-6">
        {t("allBikes")}
      </h1>

      <div className="flex justify-center mb-6">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder={t("searchPlaceholder")}
          className="px-4 py-2 rounded bg-gray-800 w-full sm:w-1/2"
        />
      </div>

      {loading && <p className="text-center">{t("loading")}</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <BikeGrid bikes={bikes} onSelect={setSelectedBike} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {selectedBike && (
        <BikeDetailModal
          bike={selectedBike}
          onClose={() => setSelectedBike(null)}
        />
      )}
    </div>
  );
}
