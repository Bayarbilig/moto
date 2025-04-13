"use client";
import { api } from "@/lib/axios";
import Head from "next/head";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { events } from "./mock";

// Types
type RegistrationStep = "personal" | "motorcycle" | "completion";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  identityNumber?: string;
  emergencyContact?: string;
}

interface MotorcycleInfo {
  engineCapacity: string;
  registrationNumber: string;
  chassisCapacity: string;
  experience?: string;
  agreeToTerms: boolean;
}

const MotorcycleRegistration = () => {
  const router = useRouter();
  const { id } = useParams();
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const matchedEvent = events.find((event) => event.id === Number(id));
    if (matchedEvent) {
      setName(matchedEvent.title);
    }
  }, [id, events]);
  const [currentStep, setCurrentStep] = useState<RegistrationStep>("personal");
  const [completed, setCompleted] = useState<RegistrationStep[]>([]);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    identityNumber: "",
    emergencyContact: "",
  });
  const [motorcycleInfo, setMotorcycleInfo] = useState<MotorcycleInfo>({
    engineCapacity: "",
    registrationNumber: "",
    chassisCapacity: "",
    experience: "",
    agreeToTerms: false,
  });

  const goBack = () => {
    if (currentStep === "motorcycle") {
      setCurrentStep("personal");
    } else if (currentStep === "completion") {
      setCurrentStep("motorcycle");
    } else {
      router.push("/");
    }
  };

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    });
  };

  const handleMotorcycleInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      setMotorcycleInfo({
        ...motorcycleInfo,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setMotorcycleInfo({
        ...motorcycleInfo,
        [name]: value,
      });
    }
  };

  const proceedToNextStep = async () => {
    if (currentStep === "personal") {
      setCompleted([...completed, "personal"]);
      setCurrentStep("motorcycle");
    } else if (currentStep === "motorcycle") {
      setCompleted([...completed, "motorcycle"]);
      setCurrentStep("completion");
    } else {
      const payload = {
        personalInfo,
        motorcycleInfo,
        tournament: { name: name },
      };
      try {
        const response = await api.post("/api/register", payload);
        console.log("Server response:", response.data);
        router.push("/success");
      } catch (error: any) {
        console.error(
          "Submission error:",
          error.response?.data || error.message
        );
        alert("Бүртгэл илгээхэд алдаа гарлаа.");
      }
    }
  };

  const isCurrentStepValid = () => {
    if (currentStep === "personal") {
      return (
        personalInfo.firstName &&
        personalInfo.lastName &&
        personalInfo.email &&
        personalInfo.phone
      );
    } else if (currentStep === "motorcycle") {
      return (
        motorcycleInfo.engineCapacity &&
        motorcycleInfo.registrationNumber &&
        motorcycleInfo.chassisCapacity
      );
    }
    return true;
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#1E1E1E] text-white">
      <Head>
        <title>Мото Тэмцээнд Бүртгүүлэх</title>
        <meta name="description" content="Motorcycle registration form" />
      </Head>

      <div className="w-full max-w-4xl p-6 bg-[#262626] rounded-lg my-48">
        <button
          onClick={goBack}
          className="text-orange-500 flex items-center mb-6"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="ml-2">Буцах</span>
        </button>

        <h1 className="text-3xl font-bold mb-2">Мото Тэмцээнд Бүртгүүлэх</h1>
        <p className="text-gray-400 mb-8">
          Тэмцээнд оролцохын тулд доорх мэдэгтыг бөглөнө үү.
        </p>

        {/* Progress Bar */}
        <div className="relative mb-12">
          <div className="overflow-hidden h-2 mb-4 flex rounded bg-gray-700">
            <div
              className="bg-orange-500 transition-all duration-500 ease-out"
              style={{
                width:
                  currentStep === "personal"
                    ? "33%"
                    : currentStep === "motorcycle"
                    ? "66%"
                    : "100%",
              }}
            ></div>
          </div>
          <div className="flex justify-between">
            <div className="text-center">
              <div
                className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full ${
                  completed.includes("personal") || currentStep === "personal"
                    ? "bg-orange-500"
                    : "bg-gray-700"
                }`}
              >
                {completed.includes("personal") ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <div
                    className={`w-4 h-4 rounded-full ${
                      currentStep === "personal"
                        ? "bg-orange-500"
                        : "bg-gray-700"
                    }`}
                  ></div>
                )}
              </div>
              <div className="text-sm mt-2">Хувийн мэдээлэл</div>
            </div>
            <div className="text-center">
              <div
                className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full ${
                  completed.includes("motorcycle") ||
                  currentStep === "motorcycle"
                    ? "bg-orange-500"
                    : "bg-gray-700"
                }`}
              >
                {completed.includes("motorcycle") ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <div
                    className={`w-4 h-4 rounded-full ${
                      currentStep === "motorcycle"
                        ? "bg-orange-500"
                        : "bg-gray-700"
                    }`}
                  ></div>
                )}
              </div>
              <div className="text-sm mt-2">Мотоциклын мэдээлэл</div>
            </div>
            <div className="text-center">
              <div
                className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full ${
                  completed.includes("completion") ||
                  currentStep === "completion"
                    ? "bg-orange-500"
                    : "bg-gray-700"
                }`}
              >
                {completed.includes("completion") ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <div
                    className={`w-4 h-4 rounded-full ${
                      currentStep === "completion"
                        ? "bg-orange-500"
                        : "bg-gray-700"
                    }`}
                  ></div>
                )}
              </div>
              <div className="text-sm mt-2">Баталгаажуулалт</div>
            </div>
          </div>
        </div>

        {/* Personal Information Form */}
        {currentStep === "personal" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium mb-2"
                >
                  Нэр
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={personalInfo.firstName}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-3 rounded bg-transparent border border-[#404040] text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Нэр"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium mb-2"
                >
                  Нас
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={personalInfo.lastName}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-3 rounded bg-transparent border border-[#404040] text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Нас"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  И-мэйл
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={personalInfo.email}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-3 rounded bg-transparent border border-[#404040] text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="И-мэйл"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-2"
                >
                  Утасны дугаар
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={personalInfo.phone}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-3 rounded bg-transparent border border-[#404040] text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Утасны дугаар"
                />
              </div>
              <div>
                <label
                  htmlFor="identityNumber"
                  className="block text-sm font-medium mb-2"
                >
                  Жолооны үнэмлэхийн дугаар
                </label>
                <input
                  type="text"
                  id="identityNumber"
                  name="identityNumber"
                  value={personalInfo.identityNumber}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-3 rounded bg-transparent border border-[#404040] text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Үнэмлэхийн дугаар"
                />
              </div>
              <div>
                <label
                  htmlFor="emergencyContact"
                  className="block text-sm font-medium mb-2"
                >
                  Яаралтай үед холбоо барих утас
                </label>
                <input
                  type="tel"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={personalInfo.emergencyContact}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-3 rounded bg-transparent border border-[#404040] text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Яаралтай үед холбоо барих утас"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={proceedToNextStep}
                disabled={!isCurrentStepValid()}
                className={`px-6 py-3 rounded ${
                  isCurrentStepValid()
                    ? "bg-[#F95F19] hover:bg-orange-600"
                    : "bg-gray-600 cursor-not-allowed"
                } text-white font-medium transition-colors`}
              >
                Дараах
              </button>
            </div>
          </div>
        )}

        {/* Motorcycle Information Form */}
        {currentStep === "motorcycle" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="engineCapacity"
                  className="block text-sm font-medium mb-2"
                >
                  Ангилал
                </label>
                <select
                  id="engineCapacity"
                  name="engineCapacity"
                  value={motorcycleInfo.engineCapacity}
                  onChange={handleMotorcycleInfoChange as any}
                  className="w-full p-3 rounded bg-[#262626] border border-[#404040] text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Ангилаа сонгоно уу</option>
                  <option value="125cc">125cc</option>
                  <option value="250cc">250cc</option>
                  <option value="500cc">500cc</option>
                  <option value="1000cc">1000cc</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="registrationNumber"
                  className="block text-sm font-medium mb-2"
                >
                  Мотоциклын загвар
                </label>
                <input
                  type="text"
                  id="registrationNumber"
                  name="registrationNumber"
                  value={motorcycleInfo.registrationNumber}
                  onChange={handleMotorcycleInfoChange}
                  className="w-full p-3 rounded bg-transparent border border-[#404040] text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Загвараа бичих"
                />
              </div>
              <div>
                <label
                  htmlFor="chassisCapacity"
                  className="block text-sm font-medium mb-2"
                >
                  Мотоциклын багтаамж (cc)
                </label>
                <input
                  type="text"
                  id="chassisCapacity"
                  name="chassisCapacity"
                  value={motorcycleInfo.chassisCapacity}
                  onChange={handleMotorcycleInfoChange}
                  className="w-full p-3 rounded bg-transparent border border-[#404040] text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Мотоциклын багтаамж (cc)"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium mb-2"
              >
                Туршлага
              </label>
              <textarea
                id="experience"
                name="experience"
                value={motorcycleInfo.experience}
                onChange={handleMotorcycleInfoChange}
                rows={4}
                className="w-full p-3 rounded bg-transparent border border-[#404040] text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Өмнө нь ямар тэмцээнд оролцож байсан, хэр туршлагатай вэ?"
              ></textarea>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={motorcycleInfo.agreeToTerms}
                  onChange={handleMotorcycleInfoChange}
                  className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeToTerms" className="text-gray-400">
                  Тэмцээний дүрэм, журамтай танилцсан
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Би тэмцээний дүрэм журамтай танилцаж, өөрийн биеийн аюулгүй
                  байдлыг хариуцах үүрэг хүлээж байна. Тэмцээний үеэр гарсан
                  аливаа осол, гэмтэл, бэртлийн хариуцлагыг өөрөө хүлээнэ.
                </p>
              </div>
            </div>

            <div className="flex justify-between space-x-4 pt-4">
              <button
                type="button"
                onClick={goBack}
                className="px-6 py-3 rounded bg-transparent border border-[#404040] hover:bg-gray-600 text-white font-medium transition-colors"
              >
                Өмнөх
              </button>
              <button
                type="button"
                onClick={proceedToNextStep}
                disabled={!isCurrentStepValid() || !motorcycleInfo.agreeToTerms}
                className={`px-6 py-3 rounded ${
                  isCurrentStepValid() && motorcycleInfo.agreeToTerms
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-gray-600 cursor-not-allowed"
                } text-white font-medium transition-colors`}
              >
                Дараах
              </button>
            </div>
          </div>
        )}

        {/* Confirmation Step */}
        {currentStep === "completion" && (
          <div className="space-y-6 bg-[#3F3F46] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Таны мэдээлэл</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Нэр:</p>
                <p>{personalInfo.firstName}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Нас:</p>
                <p>{personalInfo.lastName}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">И-мэйл:</p>
                <p>{personalInfo.email}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Утас:</p>
                <p>{personalInfo.phone}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700">
              <h3 className="text-lg font-medium mb-4">Мотоциклын мэдээлэл</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Ангилал:</p>
                  <p>{motorcycleInfo.engineCapacity}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Мотоциклын загвар:</p>
                  <p>{motorcycleInfo.registrationNumber}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Мотоциклын багтаамж:</p>
                  <p>{motorcycleInfo.chassisCapacity}cc</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between space-x-4 pt-4">
              <button
                type="button"
                onClick={goBack}
                className="px-6 py-3 rounded bg-gray-700 hover:bg-gray-600 text-white font-medium transition-colors"
              >
                Өмнөх
              </button>
              <button
                type="button"
                onClick={proceedToNextStep}
                className="px-6 py-3 rounded bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors"
              >
                Бүртгүүлэх
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MotorcycleRegistration;
