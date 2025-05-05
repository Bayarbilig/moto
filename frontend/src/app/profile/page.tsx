"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { uploadImageToCloud } from "@/utils/uploadImage";

interface Profile {
  name: string;
  email: string;
  avatar: string;
}

const ProfilePage = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>({
    name: "",
    email: "",
    avatar: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Upload the image to Cloud or S3
      const imageUrl = await uploadImageToCloud(file);
      setProfile((prev) => ({ ...prev, avatar: imageUrl }));
    } catch (error) {
      toast.error("Зураг илгээхэд алдаа гарлаа");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = async () => {
    try {
      setIsSaving(true);

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile), // profile-д URL байж байх ёстой
      });

      if (!response.ok) throw new Error("Хадгалах явцад алдаа гарлаа");

      toast.success("Профайл амжилттай хадгалагдлаа!");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-20 px-4">
      <h1 className="text-2xl font-bold mb-6 text-white">Профайл</h1>

      {/* Profile Image Upload */}
      {/* <div className="mb-6 flex items-center gap-4">
        {profile.avatar ? (
          <Image
            src={profile.avatar}
            alt="Profile"
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm">
            Зураг
          </div>
        )}
        <label className="cursor-pointer text-sm text-orange-400">
          📸 Зураг нэмэх
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div> */}

      {/* Profile Inputs */}
      <div className="mb-4">
        <label className="block text-white mb-1">Нэр</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
      </div>

      <div className="mb-6">
        <label className="block text-white mb-1">Имэйл</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
      </div>

      <button
        onClick={saveProfile}
        disabled={isSaving}
        className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
      >
        {isSaving ? "Хадгалж байна..." : "Хадгалах"}
      </button>
    </div>
  );
};

export default ProfilePage;
