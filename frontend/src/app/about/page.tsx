"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  isGuide?: boolean;
}

const TeamMember = ({
  name,
  role,
  image,
  isGuide = false,
}: TeamMemberProps) => (
  <div className="flex flex-col">
    <div className="relative overflow-hidden mb-4 bg-gray-800 rounded">
      <Image
        src={image}
        alt={`${role} - ${name}`}
        width={400}
        height={400}
        className="w-full aspect-square object-cover"
        placeholder="blur"
        blurDataURL="/blur-placeholder.jpg" // Optional: Add a real blur placeholder image
        loading="lazy"
      />
    </div>
    <h3 className="text-white text-lg font-medium">{name}</h3>
    <p className="text-white text-base font-light">{role}</p>
    {isGuide && (
      <div className="flex items-center mt-1 text-white">
        <span className="text-sm">→</span>
      </div>
    )}
  </div>
);

const About = () => {
  const { t } = useTranslation("about");

  const teamMembers: TeamMemberProps[] = [
    { name: "Dorj", role: "Founder", image: "/dorj.jpg" },
    { name: "Bat-erdene", role: "CEO", image: "/Bat-erdene.jpg" },
    { name: "Tuguldur", role: "Manager", image: "/tuguldur.jpg" },
    {
      name: "Tselmeg",
      role: "Mechanic and welder",
      image: "/Tselmeg-about.jpg",
    },
    { name: "Bilguun", role: "Mechanic", image: "/u.bilguun.jpg" },
    { name: "Radnaabazar", role: "Mechanic", image: "/radnaa.jpg" },
  ];

  return (
    <main className="min-h-screen bg-black">
      {/* Intro Section */}
      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-400 mb-8">
                {t("headline")}
              </h1>
            </div>
            <div>
              <p className="text-white text-lg">{t("desc1")}</p>
              <p className="text-white text-lg mt-4">{t("desc2")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 md:px-12 bg-zinc-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/eliteMotoAboutGroup.jpg"
                alt="Team Meeting"
                width={800}
                height={600}
                className="w-full rounded-md shadow-xl"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                {t("missionTitle")}
              </h2>
              <p className="text-white text-lg">{t("missionDesc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-12">
            {t("teamTitle")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamMember
                key={member.name}
                name={member.name}
                role={member.role}
                image={member.image}
                isGuide={member.role.toLowerCase().includes("guide")}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
