import React from "react";

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
    },
    {
      name: "Bat-erdene",
      role: "CEO",
      image: "Bat-erdene.jpg",
    },
    {
      name: "Tuguldur",
      role: "Manager",
      image: "tuguldur.jpg",
    },
    {
      name: "Tselmeg",
      role: "Mechanic and welder",
      image: "Tselmeg-about.jpg",
    },
    {
      name: "Bilguun",
      role: "Mechanic",
      image: "u.bilguun.jpg",
    },
    {
      name: "Radnaabazar",
      role: "Mechanic",
      image: "radnaa.jpg",
    },
  ];

  const guides = [
    {
      name: "Arthur Wright",
      role: "Tour guide",
      image:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Brandon George",
      role: "Tour guide",
      image:
        "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fG1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Philip Freeman",
      role: "Tour guide",
      image:
        "https://images.unsplash.com/photo-1480429370139-e0132c086e2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Davis Williams",
      role: "Tour guide",
      image:
        "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "John Anderson",
      role: "Tour guide",
      image:
        "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Daniel Miller",
      role: "Tour guide",
      image:
        "https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-400 mb-8">
                "Мотоцикл сонирхогч та бүхэндээ хамгийн чанартай барааг хүргэх
                болно"
              </h1>
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
                src="eliteMotoAboutGroup.jpg"
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
              />
            ))}
          </div>
        </div>
      </section>

      {/* Guides Section */}
      {/* <section className="py-16 px-6 md:px-12">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-12">
            ТУРШЛАГАТАЙ ГАЙД НАР
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {guides.map((guide, index) => (
              <TeamMember
                key={index}
                name={guide.name}
                role={guide.role}
                image={guide.image}
                isGuide={true}
              />
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default About;
