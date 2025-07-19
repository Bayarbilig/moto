import React from "react";

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
  const teamMembers = [
    {
      name: "Dorj",
      role: "Founder",
      image: "dorj.jpg",
      phone: "+976 8957-8282",
    },
    {
      name: "Bat-erdene",
      role: "CEO",
      image: "Bat-erdene.jpg",
      phone: "+976 9910-1857",
    },
    {
      name: "Tuguldur",
      role: "Manager",
      image: "Tuguldur.jpg",
      phone: "+976 9191-3934",
    },
    {
      name: "Tselmeg",
      role: "Mechanic and welder",
      image: "Tselmeg.jpg",
      phone: "+976 8512-9593",
    },
    {
      name: "Bilguun",
      role: "Mechanic",
      image: "u.bilguun.jpg",
      phone: "+976 9577-9159",
    },
    {
      name: "Radnaabazar",
      role: "Mechanic",
      image: "radnaa.jpg",
      phone: "+976 9478-6311"
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Intro Section */}
      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-400 mb-8">
                "Мотоцикл сонирхогч та бүхэндээ хамгийн чанартай барааг хүргэх
                болно"
              </h1>
              <div className="mt-4 text-white text-lg">
                <p>
                  Холбоо барих:{" "}
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
              <p className="text-white text-lg">
                Мото спортод дуртай, адал явдалд дурлагч та бүхэнд зориулагдсан
                Мото шоп нь зөвхөн чанартай, баталгаатай бараа бүтээгдэхүүн,
                тоног төхөөрөмж, мэргэжлийн засвар үйлчилгээ, сэлбэг хэрэгслийг
                нэг дороос санал болгож байна.
              </p>
              <p className="text-white text-lg mt-4">
                Энэхүү брэнд нь байгаль, хурд болон эрх чөлөө гэсэн гурван үнэ
                цэнийг эрхэмлэн үйл ажиллагаагаа явуулдаг. Анх хобби маягаар
                эхэлсэн аялал маань өнөөдөр олон зуун хэрэглэгчтэй, мэргэжлийн
                түвшний баг болж өргөжсөн.
              </p>
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
                ХҮСЭЛ МӨРӨӨДЛӨӨС ЭРХЭМ ЗОРИЛГОД
              </h2>
              <p className="text-white text-lg">
                Байгальд ээлтэй, аюулгүй, сэтгэл хөдөлгөм аялал зохион байгуулах
                нь бидний туйлын зорилго. Мөн зөвхөн аялал биш — хэрэглэгч
                бүрдээ мото ертөнцийн сэтгэл хөдлөл, үнэ цэнийг мэдрүүлэхийг
                зорьдог.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-12">
            МАНАЙ БАГ
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
