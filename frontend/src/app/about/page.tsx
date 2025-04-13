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
      name: "Paul George",
      role: "Founder",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YnVzaW5lc3MlMjBtYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Samuel Davis",
      role: "CEO",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGJ1c2luZXNzJTIwbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Amelia Taylor",
      role: "Manager",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzaW5lc3MlMjB3b21hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Lily May",
      role: "Health officer",
      image:
        "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YnVzaW5lc3MlMjB3b21hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Alexander Moore",
      role: "Photographer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YnVzaW5lc3MlMjBtYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Edward Scott",
      role: "Technician",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJ1c2luZXNzJTIwbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
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
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
                About us
              </h1>
            </div>
            <div>
              <p className="text-white text-lg">
                The history of our company began with the passion of
                nature-loving and adventure-seeking travelers who wanted to
                experience and share the wonder of motorcycle travel through the
                mountains and deserts. This is what led us to create this
                company.
              </p>
              <p className="text-white text-lg mt-4">
                Our team first united with three words: nature, motorcycle and
                adventure, and set a goal to travel to the beautiful places of
                our country and share it with others. Throughout the journey,
                protecting the environment and respecting local culture and
                history have been at the core of our operations.
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
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dGVhbSUyMG1lZXRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
                alt="Team Meeting"
                className="w-full rounded-md shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                FROM PASSION TO PURPOSE
              </h2>
              <p className="text-white text-lg">
                Our desire to share our lifestyle and passion for adventure is
                enough to motivate us to continuously improve and innovate in
                all aspects of our travel company.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-12">
            OUR TEAM
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
      <section className="py-16 px-6 md:px-12">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-12">
            OUR EXPERIENCED GUIDES
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
      </section>
    </div>
  );
};

export default About;
