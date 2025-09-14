import React from "react";
import { useTranslation } from "next-i18next";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  phone?: string;
  isGuide?: boolean;
}

const TeamMember = ({
  name,
  role,
  image,
  phone,
  isGuide = false,
}: TeamMemberProps) => {
  return (
    <div className="flex flex-col">
      <div className="relative overflow-hidden mb-4 bg-gray-800">
        <img
          src={image}
          alt={name}
          className="w-full aspect-square object-cover"
        />
      </div>
      <h3 className="text-white text-lg font-medium">{name}</h3>
      <p className="text-white text-base font-light">{role}</p>
      {phone && (
        <a
          href={`tel:${phone}`}
          className="text-blue-400 text-sm mt-1 hover:underline"
        >
          {phone}
        </a>
      )}
      {isGuide && (
        <div className="flex items-center mt-1 text-white">
          <span className="text-sm">→</span>
        </div>
      )}
    </div>
  );
};

const About = () => {
  const { t } = useTranslation("common");
  const teamMembers = [
    {
      name: t("Dorj"),
      role: t("founder"),
      image: "dorj.jpg",
      phone: "+976 8957-8282",
    },
    {
      name: t("Bat-erdene"),
      role: t("ceo"),
      image: "Bat-erdene.jpg",
      phone: "+976 9910-1857",
    },
    {
      name: t("Tuguldur"),
      role: t("maneger"),
      image: "tuguldur.jpg",
      phone: "+976 9191-3934",
    },
    {
      name: t("Tselmeg"),
      role: t("mechanic"),
      image: "tselmeg.jpg",
      phone: "+976 8512-9593",
    },
    {
      name: t("Bilguun"),
      role: t("mechanic2"),
      image: "u.bilguun.jpg",
      phone: "+976 9577-9159",
    },
    {
      name: t("Radnaabazar"),
      role: t("mechanic3"),
      image: "radnaa.jpg",
      phone: "+976 9478-6311",
    },
  ];
  const partners = [
    { img: "/net.jpg", link: "https://www.facebook.com/netcapital.mn" },
    { img: "/ylguun.jpg", link: "https://www.facebook.com/Yalguundesign" },
    { img: "/msk.jpg", link: "https://www.facebook.com/munkhorshikhcapital" },
    { img: "/net.jpg", link: "https://www.facebook.com/netcapital.mn" },
    { img: "/ylguun.jpg", link: "https://www.facebook.com/Yalguundesign" },
    { img: "/msk.jpg", link: "https://www.facebook.com/munkhorshikhcapital" },
  ];
  const marqueePartners = [...partners, ...partners, ...partners];

  return (
    <div className="min-h-screen bg-black">
      {/* Intro Section */}
      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-400 mb-8">
                {t("detaillefttop")}
              </h1>
              <div className="mt-4 text-white text-lg">
                <p>
                  {t("phone")}:{" "}
                  <a
                    href="tel:+97689578282"
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    +976 8957-8282
                  </a>
                </p>
              </div>
            </div>
            <div>
              <p className="text-white text-lg">{t("detailrightTop1")}</p>
              <p className="text-white text-lg mt-4">{t("detailrightTop2")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mid Section */}
      <section className="py-16 px-6 md:px-12 bg-zinc-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="eliteGroup.jpg"
                alt="Team Meeting"
                className="w-full rounded-md shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                {t("dream")}
              </h2>
              <p className="text-white text-lg">{t("dreamtext")}</p>
            </div>
          </div>
        </div>
      </section>
      <div className="relative py-8">
        <div className="overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-12">
            {marqueePartners.map((partner, index) => (
              <a
                href={partner.link}
                key={index}
                className="flex-shrink-0 flex flex-col items-center"
              >
                <img
                  src={partner.img}
                  alt={partner.link}
                  className="h-20 lg:h-40 object-contain transition-transform duration-300 hover:scale-110"
                />
                <span className="mt-2 text-gray-300 text-sm md:text-base"></span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-12">
            {t("our_team")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                role={member.role}
                image={member.image}
                phone={member.phone}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
