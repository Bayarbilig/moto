import React, { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { api } from "@/lib/axios";

type Service = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  motoModel: string;
  motoYear: string;
  date: string;
  time: string;
  totalPrice: number;
  notes: string;
  services: { name: string; price: number }[];
};

export const Services = () => {
  const [motoservices, setMotoServices] = useState<Service[]>([]);
  const [services, setServices] = useState([]);

  // Fetch services
  useEffect(() => {
    const fetchMotoServices = async () => {
      try {
        const res = await api.get("/api/motoservices");
        setMotoServices(res.data.data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    };
    const fetchServices = async () => {
      try {
        const res = await api.get("/api/services");
        setServices(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchServices();
    fetchMotoServices();
  }, []);

  // Delete a service
  const handleDelete = async (id: string) => {
    if (confirm("Та энэ захиалгыг устгахдаа итгэлтэй байна уу?")) {
      try {
        await api.delete(`/api/motoservices/${id}`);
        setMotoServices((prev) => prev.filter((service) => service._id !== id));
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  return (
    <div className="flex-1 text-white">
      <h2 className="text-xl font-semibold mb-4">Захиалгын жагсаалт</h2>
      <div className="max-h-[460px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#e15617] scrollbar-track-[#222] space-y-4">
        {motoservices.map((item) => (
          <div
            key={item._id}
            className="group border border-gray-700 rounded-lg overflow-hidden bg-[#2a2a2a] hover:border-[#e15617] transition"
          >
            <div className="flex gap-4 items-start p-4">
              <div className="flex-1 text-sm space-y-1">
                <p className="font-semibold">Нэр: {item.name}</p>
                <p className="text-gray-400">Утас: {item.phone}</p>
                <p className="text-gray-400">И-мэйл: {item.email}</p>
                <p className="text-gray-400">
                  Загвар: {item.motoModel} ({item.motoYear})
                </p>
                <p className="text-gray-400">
                  Огноо: {item.date.slice(0, 10)} | Цаг: {item.time}
                </p>
                <p className="text-gray-400">
                  Үнэ: {item.totalPrice.toLocaleString()}₮
                </p>
                <p className="text-gray-400">Тайлбар: {item.notes}</p>
                <div className="flex gap-2">
                  <p className="text-gray-400">Үйлчилгээ:</p>
                  {item.services.map((service, index) => (
                    <div key={index} className="flex">
                      <p className="text-gray-400">{service.name}--</p>
                      <p className="text-gray-400">{service.price}</p>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => handleDelete(item._id)} title="Устгах">
                <BiTrash className="text-red-500 text-2xl hover:scale-110 transition" />
              </button>
            </div>
          </div>
        ))}
        {motoservices.length === 0 && (
          <p className="text-gray-500 text-center mt-10">
            Одоогоор захиалга алга
          </p>
        )}
      </div>
    </div>
  );
};
