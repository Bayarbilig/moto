"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();

  return (
    <div className="bg-[#1E1E1E] min-h-screen py-10 sm:py-16 px-4 sm:px-6 md:px-8 my-9 text-white">
      <div className="max-w-3xl mx-auto">
        {/* Хувийн мэдээлэл */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Миний профайл</h1>

        <div className="bg-[#262626] p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label className="block text-sm text-gray-400">Нэр</label>
            <input
              type="text"
              className="mt-1 w-full px-4 py-2 rounded bg-[#1E1E1E] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Таны нэр"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400">Имэйл</label>
            <input
              type="email"
              className="mt-1 w-full px-4 py-2 rounded bg-[#1E1E1E] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400">Нууц үг</label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-2 rounded bg-[#1E1E1E] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="••••••••"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button className="bg-[#F95F19] hover:bg-orange-600 transition px-6 py-2 rounded text-white font-medium">
              Хадгалах
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
