"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { uploadImageToCloud } from "@/utils/uploadImage";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";

interface Profile {
  name: string;
  email: string;
  avatar: string;
}

const ProfilePage = () => {
  const { t } = useTranslation("profile");
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
      const imageUrl = await uploadImageToCloud(file);
      setProfile((prev) => ({ ...prev, avatar: imageUrl }));
    } catch (error) {
      toast.error(t("error_upload"));
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
        body: JSON.stringify(profile),
      });

      if (!response.ok) throw new Error(t("error_save"));

      toast.success(t("success_save"));
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    toast.success(t("success_logout"));
    router.push("/");
  };

  return (
    <div className="max-w-xl mx-auto py-20 px-4">
      <h1 className="text-2xl font-bold mb-6 text-white">{t("title")}</h1>

      <div className="mb-6 flex items-center gap-4">
        {profile.avatar ? (
          <Image
            src={profile.avatar}
            alt="Avatar"
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm">
            {t("no_avatar")}
          </div>
        )}
        <label className="cursor-pointer text-sm text-orange-400">
          📸 {t("upload_image")}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-white mb-1">{t("label_name")}</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
      </div>

      <div className="mb-6">
        <label className="block text-white mb-1">{t("label_email")}</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={saveProfile}
          disabled={isSaving}
          className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
        >
          {isSaving ? t("saving") : t("save")}
        </button>
        <button
          onClick={logout}
          className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
        >
          {t("logout")}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
