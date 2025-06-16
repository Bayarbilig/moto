"use client";

import React, { useState } from "react";
import { Entry } from "./Types";

interface UsersTabProps {
  data: Entry[];
}

export default function UsersTab({ data }: UsersTabProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const totalPages = Math.ceil(data.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentEntries = data.slice(startIndex, startIndex + entriesPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePageClick = (page: number) => setCurrentPage(page);

  return (
    <div className="h-screen px-8 py-6 ">
      <h1 className="text-2xl font-bold mb-6 text-white text-center">
        Бүртгүүлсэн хэрэглэгчид
      </h1>
      <div className="overflow-x-auto rounded-lg border border-[#1a1a1a]">
        <table className="min-w-full border-collapse">
          <thead className="bg-[#1a1a1a] text-white">
            <tr>
              {[
                "Овог",
                "Нэр",
                "Имэйл",
                "Утас",
                "Регистр",
                "Мото дугаар",
                "Хөдөлгүүр",
                "Туршлага",
                "Уралдаан",
              ].map((header) => (
                <th
                  key={header}
                  className="border border-gray-600 px-4 py-3 text-center"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((entry, idx) => (
              <tr
                key={entry._id}
                className={
                  idx % 2 === 0
                    ? "bg-gray-800 text-white"
                    : "bg-[#1a1a1a] text-gray-300"
                }
              >
                <td className="border border-gray-600 px-4 py-2 text-center">
                  {entry.personalInfo.lastName}
                </td>
                <td className="border border-gray-600 px-4 py-2 text-center">
                  {entry.personalInfo.firstName}
                </td>
                <td className="border border-gray-600 px-4 py-2 text-center">
                  {entry.personalInfo.email}
                </td>
                <td className="border border-gray-600 px-4 py-2 text-center">
                  {entry.personalInfo.phone}
                </td>
                <td className="border border-gray-600 px-4 py-2 text-center">
                  {entry.personalInfo.identityNumber}
                </td>
                <td className="border border-gray-600 px-4 py-2 text-center">
                  {entry.motorcycleInfo.registrationNumber}
                </td>
                <td className="border border-gray-600 px-4 py-2 text-center">
                  {entry.motorcycleInfo.engineCapacity}
                </td>
                <td className="border border-gray-600 px-4 py-2 text-center">
                  {entry.motorcycleInfo.experience}
                </td>
                <td className="border border-gray-600 px-4 py-2 text-center">
                  {decodeURIComponent(entry.tournament.name)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6 text-white">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#1a1a1a] hover:bg-[#1a1a1a]"
          }`}
        >
          Өмнөх
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageClick(pageNum)}
                className={`px-3 py-1 rounded ${
                  pageNum === currentPage
                    ? "bg-[#1a1a1a] font-bold"
                    : "bg-[#1a1a1a] hover:bg-[#1a1a1a]"
                }`}
              >
                {pageNum}
              </button>
            )
          )}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#1a1a1a] hover:bg-[#1a1a1a]"
          }`}
        >
          Дараах
        </button>
      </div>
    </div>
  );
}
