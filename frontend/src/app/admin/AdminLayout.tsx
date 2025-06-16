"use client";

import React from "react";

interface AdminLayoutProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
}

export default function AdminLayout({
  activeTab,
  onTabChange,
  children,
}: AdminLayoutProps) {
  const tabs = ["Users", "Moto", "Event", "Time", "Service"];

  const tabLabels: Record<string, string> = {
    Users: "Хэрэглэгч",
    Moto: "Мото Үүсгэх",
    Event: "Эвэнт харах",
    Time: "Үйлчилгээ үүсгэх",
    Service: "Үйлчилгээ Харах",
  };

  return (
    <div className="p-4 py-32 h-fit">
      <div className="flex gap-12 py-12 px-32">
        {tabs.map((tab) => (
          <p
            key={tab}
            className={`cursor-pointer ${
              activeTab === tab ? "text-[#e15617] underline" : "text-white"
            }`}
            onClick={() => onTabChange(tab)}
          >
            {tabLabels[tab]}
          </p>
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
}
