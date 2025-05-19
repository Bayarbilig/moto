// src/pages/index.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import axios from "axios";
import { api } from "@/lib/axios";
import { toast } from "react-toastify";

interface Service {
  _id: string;
  name: string;
  price: number;
}

interface BookingData {
  name: string;
  phone: string;
  email: string;
  motoModel: string;
  motoYear: string;
  date: string;
  time: string;
  serviceIds: string[];
  notes?: string;
}

export default function Home() {
  const [formData, setFormData] = useState<BookingData>({
    name: "",
    phone: "",
    email: "",
    motoModel: "",
    motoYear: "2004",
    date: "",
    time: "",
    serviceIds: [],
    notes: "",
  });

  const [selectedDate, setSelectedDate] = useState("");
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceDropdownRef = useRef<HTMLDivElement>(null);
  const yearDropdownRef = useRef<HTMLDivElement>(null);

  const [services, setServices] = useState<Service[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [motoservices, setMotoServices] = useState([]);

  useEffect(() => {
    const fetchMotoservices = async () => {
      try {
        const res = await api.get("/api/motoservices");
        setMotoServices(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMotoservices();
  }, []);

  const years = Array.from({ length: 30 }, (_, i) => 2024 - i);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get<{ success: boolean; data: Service[] }>(
          `/api/services`
        );
        setServices(response.data.data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (services.length === 0 || formData.serviceIds.length === 0) {
      setTotalPrice(0);
      setPriceRange({ min: 0, max: 0 });
      return;
    }

    const selectedServices = services.filter((service) =>
      formData.serviceIds.includes(service._id)
    );

    const total = selectedServices.reduce(
      (sum, service) => sum + service.price,
      0
    );
    setTotalPrice(total);

    setPriceRange({
      min: Math.floor(total * 0.9),
      max: Math.ceil(total * 1.1),
    });
  }, [formData.serviceIds, services]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("mn-MN");
  };

  const generateTimeSlots = () => {
    const slots: string[][] = [];
    let times: string[] = [];
    for (let hour = 9; hour <= 17; hour++) {
      const timeString = `${hour.toString().padStart(2, "0")}:00`;
      times.push(timeString);
    }
    for (let i = 0; i < times.length; i += 5) {
      slots.push(times.slice(i, i + 5));
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const getSelectedServicesText = () => {
    const selectedServiceObjects = services.filter((service) =>
      formData.serviceIds.includes(service._id)
    );

    if (selectedServiceObjects.length === 0) return "Үйлчилгээ сонгох";
    if (selectedServiceObjects.length === 1)
      return selectedServiceObjects[0].name;
    return `${selectedServiceObjects[0].name} +${
      selectedServiceObjects.length - 1
    }`;
  };

  const toggleServiceDropdown = () => {
    setIsServiceDropdownOpen(!isServiceDropdownOpen);
  };
  const getPickedTimesForDate = (selected: string) => {
    if (!selected || isNaN(new Date(selected).getTime())) return [];

    const selectedISO = new Date(selected).toISOString().split("T")[0];

    return motoservices
      .filter((service: any) => {
        const serviceDate = new Date(service.date).toISOString().split("T")[0];
        return serviceDate === selectedISO;
      })
      .map((service: any) => service.time);
  };

  const pickedTimes = getPickedTimesForDate(selectedDate);
  const handleServiceChange = (serviceId: string) => {
    setFormData((prev) => {
      const newServiceIds = prev.serviceIds.includes(serviceId)
        ? prev.serviceIds.filter((id) => id !== serviceId)
        : [...prev.serviceIds, serviceId];

      return { ...prev, serviceIds: newServiceIds };
    });
  };

  const handleTimeSlotSelect = (time: string) => {
    setFormData((prev) => ({ ...prev, time }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    setFormData((prev) => ({ ...prev, date: newDate }));
  };

  const handleYearSelect = (year: string) => {
    setFormData((prev) => ({ ...prev, motoYear: year }));
    setIsYearDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.motoModel ||
      !formData.date ||
      !formData.time ||
      formData.serviceIds.length === 0
    ) {
      toast.error("Бүх талбарийг бөглөнө уу");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post(`/api/motoservices`, formData);

      if (response.data.success) {
        toast.success("Амжилттай захиалга үүслээ");

        setFormData({
          name: "",
          phone: "",
          email: "",
          motoModel: "",
          motoYear: "2004",
          date: "",
          time: "",
          serviceIds: [],
          notes: "",
        });
        setSelectedDate("");
      } else {
        throw new Error("Booking failed");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        serviceDropdownRef.current &&
        event.target instanceof Node &&
        !serviceDropdownRef.current.contains(event.target)
      ) {
        setIsServiceDropdownOpen(false);
      }

      if (
        yearDropdownRef.current &&
        event.target instanceof Node &&
        !yearDropdownRef.current.contains(event.target)
      ) {
        setIsYearDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex justify-center py-48">
      <Head>
        <title>Мото үйлчилгээ</title>
        <meta name="description" content="Мото үйлчилгээний захиалга" />
      </Head>

      <div className="w-full max-w-lg px-4">
        <h1 className="text-2xl font-medium text-center mb-4">
          Мото үйлчилгээ
        </h1>

        <p className="text-center text-sm mb-8">
          Та манай мэргэжлийн баг хамт олны үйлчилгээг авахыг хүсвэл доорх
          төхөөрөг дээрх цаг захиална уу.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-sm" htmlFor="name">
              Нэр
            </label>
            <input
              type="text"
              id="name"
              className="w-full bg-black border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-gray-500"
              placeholder="Хүсэл"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm" htmlFor="phone">
              Утасны дугаар
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full bg-black border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-gray-500"
              placeholder="98665675"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm" htmlFor="email">
              И-мэйл
            </label>
            <input
              type="email"
              id="email"
              className="w-full bg-black border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-gray-500"
              placeholder="hvselnerehner@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm" htmlFor="motoModel">
              Мотоциклын модел
            </label>
            <input
              type="text"
              id="motoModel"
              className="w-full bg-black border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-gray-500"
              placeholder="46734hnf"
              value={formData.motoModel}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm">
              Мотоциклын үйлдвэрлэсэн он
            </label>
            <div className="relative" ref={yearDropdownRef}>
              <div
                className="w-full bg-[#262626] border border-[#404040] rounded px-3 py-2 text-white flex justify-between items-center cursor-pointer"
                onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
              >
                <span className="bg-[#262626]">
                  {formData.motoYear || "Он сонгох"}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    isYearDropdownOpen ? "transform rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>

              {isYearDropdownOpen && (
                <div className="absolute left-0 right-0 mt-1 bg-[#262626] border border-gray-700 rounded max-h-60 overflow-y-auto z-10">
                  {years.map((year) => (
                    <div
                      key={year}
                      className={`px-3 py-2 cursor-pointer hover:bg-[#404040] ${
                        formData.motoYear === year.toString()
                          ? "bg-[#323232]"
                          : ""
                      }`}
                      onClick={() => handleYearSelect(year.toString())}
                    >
                      {year}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm">Өдрөө сонгох</label>
            <div className="mb-4">
              <div className="flex items-center border border-gray-700 rounded px-3 py-2 w-full sm:w-1/2">
                <input
                  type="date"
                  className="bg-transparent focus:outline-none w-full text-white"
                  value={selectedDate}
                  onChange={handleDateChange}
                  style={{ colorScheme: "dark" }}
                />
              </div>
              {selectedDate && (
                <p className="text-sm text-gray-400 mt-1">
                  Сонгосон өдөр: {formatDate(selectedDate)}
                </p>
              )}
            </div>

            <div className="grid grid-cols-5 gap-2 mb-4">
              {timeSlots.flat().map((time) => {
                const isPicked = pickedTimes.includes(time);
                const isSelected = formData.time === time;

                return (
                  <button
                    key={time}
                    type="button"
                    disabled={isPicked}
                    className={`px-2 py-1 rounded text-sm ${
                      isPicked
                        ? "bg-gray-600 cursor-not-allowed"
                        : isSelected
                        ? "bg-blue-600"
                        : "bg-gray-800 hover:bg-gray-700"
                    }`}
                    onClick={() => handleTimeSlotSelect(time)}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm">Үйлчилгээ</label>
            <div className="relative" ref={serviceDropdownRef}>
              <button
                type="button"
                className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-left focus:outline-none focus:border-gray-500 flex justify-between items-center"
                onClick={toggleServiceDropdown}
              >
                <span>{getSelectedServicesText()}</span>
                <svg
                  className={`w-4 h-4 transform ${
                    isServiceDropdownOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </button>

              {isServiceDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-gray-900 border border-gray-700 rounded shadow-lg max-h-60 overflow-y-auto">
                  {services.map((service) => {
                    const isChecked = formData.serviceIds.includes(service._id);

                    return (
                      <div
                        key={service._id}
                        className="px-3 py-2 hover:bg-gray-800 cursor-pointer"
                      >
                        <label className="flex items-center space-x-2 cursor-pointer w-full">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleServiceChange(service._id)}
                            className="form-checkbox text-blue-500"
                          />
                          <span className="flex-1 text-white">
                            {service.name}
                          </span>
                          <span className="text-gray-400">
                            {service.price.toLocaleString()}₮
                          </span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="mb-6 bg-blue-900 bg-opacity-20 rounded p-4">
            <div className="text-center text-lg font-medium mb-1">
              Үйлчилгээний үнэ: {totalPrice.toLocaleString()}₮
            </div>
            {totalPrice > 0 && (
              <div className="text-center text-sm text-gray-400">
                *Үнийн хэлбэлзэлт: {priceRange.min.toLocaleString()}₮ -{" "}
                {priceRange.max.toLocaleString()}₮
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm" htmlFor="notes">
              Нэмэлт тэмдэглэл
            </label>
            <textarea
              id="notes"
              className="w-full bg-black border border-gray-700 rounded px-3 py-2 h-32 focus:outline-none focus:border-gray-500"
              placeholder="Нэмэлт мэдээлэл оруулах"
              value={formData.notes}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Захиалж байна..." : "Захиалах"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
