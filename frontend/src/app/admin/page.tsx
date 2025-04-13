"use client";
import { api } from "@/lib/axios";
import React, { useEffect, useState, useRef } from "react";

const Page = () => {
  const [data, setData] = useState([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = async () => {
    try {
      const response = await api.get("/api/register");
      setData(response.data);
    } catch (error: any) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchData();

    intervalRef.current = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="p-4 py-32 h-screen">
      <h1 className="text-xl font-bold mb-4 text-white">
        Бүртгүүлсэн хэрэглэгчид
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-black px-4 py-2">Нас</th>
              <th className="border border-black px-4 py-2">Нэр</th>
              <th className="border border-black px-4 py-2">Имэйл</th>
              <th className="border border-black px-4 py-2">Утас</th>
              <th className="border border-black px-4 py-2">Регистр</th>
              <th className="border border-black px-4 py-2">Мото дугаар</th>
              <th className="border border-black px-4 py-2">Хөдөлгүүр</th>
              <th className="border border-black px-4 py-2">Туршлага</th>
              <th className="border border-black px-4 py-2">Уралдаан</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry: any) => (
              <tr key={entry._id} className="text-center text-white">
                <td className="border px-4 py-2">
                  {entry.personalInfo.lastName}
                </td>
                <td className="border px-4 py-2">
                  {entry.personalInfo.firstName}
                </td>
                <td className="border px-4 py-2">{entry.personalInfo.email}</td>
                <td className="border px-4 py-2">{entry.personalInfo.phone}</td>
                <td className="border px-4 py-2">
                  {entry.personalInfo.identityNumber}
                </td>
                <td className="border px-4 py-2">
                  {entry.motorcycleInfo.registrationNumber}
                </td>
                <td className="border px-4 py-2">
                  {entry.motorcycleInfo.engineCapacity}
                </td>
                <td className="border px-4 py-2">
                  {entry.motorcycleInfo.experience}
                </td>
                <td className="border px-4 py-2">
                  {decodeURIComponent(entry.tournament.name)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
