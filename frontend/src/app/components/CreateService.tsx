"use client";
import { api } from "@/lib/axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CreateService = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState<{
    name: string;
    price: number | null;
  }>({ name: "", price: null });
  const [loading, setLoading] = useState(false);
  const [_message, setMessage] = useState("");

  const fetchServices = async () => {
    try {
      const res = await api.get("/api/services");
      setServices(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/services", formData);
      setFormData({ name: "", price: null });
      toast.success("Амжилттай үүслээ");
      fetchServices();
    } catch (error) {
      console.log(error);
      setMessage("Алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Та энэ үйлчилгээг устгахдаа итгэлтэй байна уу?")) return;
    try {
      await api.delete(`/api/services/${id}`);
      toast.success("Амжилттай устгалаа");
      fetchServices();
    } catch (error) {
      console.log(error);
      toast.error("Устгахад алдаа гарлаа");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="w-[600px] p-6 bg-[#1a1a1a] rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white text-center">
        Үйлчилгээ үүсгэх
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Үйлчилгээний нэр"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full p-2 border border-gray-700 rounded bg-transparent text-white placeholder-gray-400"
        />

        <input
          type="number"
          placeholder="Үнэ"
          value={formData.price ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, price: parseInt(e.target.value) })
          }
          required
          className="w-full p-2 border border-gray-700 rounded bg-transparent text-white placeholder-gray-400"
        />

        <button
          type="submit"
          className="w-full bg-[#e15617] hover:bg-[#e15617] text-white py-2 rounded transition"
        >
          {loading ? "Илгээж байна..." : "Нэмэх"}
        </button>
      </form>

      <h3 className="text-lg font-semibold text-white mb-3 text-center">
        Үйлчилгээний жагсаалт
      </h3>

      {services.length === 0 ? (
        <p className="text-center text-gray-400">Үйлчилгээ алга байна.</p>
      ) : (
        <div className="max-h-[300px] overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          {services.map((service: any) => (
            <div
              key={service._id}
              className="flex justify-between items-center p-3 bg-[#222222] rounded border border-gray-700"
            >
              <div className="text-white">
                <p className="font-medium">{service.name}</p>
                <p className="text-sm text-gray-400">{service.price}₮</p>
              </div>
              <button
                onClick={() => handleDelete(service._id)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
              >
                Устгах
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
