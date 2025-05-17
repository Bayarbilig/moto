import React, { useState, useEffect } from "react";
import { api } from "@/lib/axios";

interface Worker {
  _id: string;
  name: string;
  role?: string;
}

export default function BookingForm() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<string>("");
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get("/api/worker")
      .then((res) => setWorkers(res.data))
      .catch((err) => console.error("Error fetching workers:", err));
  }, []);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/api/booking", {
        workerId: selectedWorker,
        customerName,
        date,
      });
      setMessage("Амжилттай захиаллаа!");
      setCustomerName("");
      setDate("");
      setSelectedWorker("");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Алдаа гарлаа");
    }
  };

  return (
    <div className="max-w-md mx-auto  p-6 bg-[#1a1a1a] rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-5 text-white text-center">
        Цаг товлох
      </h2>

      {message && (
        <p className="text-center text-sm mb-4 text-emerald-400 font-medium">
          {message}
        </p>
      )}

      <form onSubmit={handleBooking} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Утасны дугаар
          </label>
          <input
            type="number"
            placeholder="99998888"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full p-2 rounded-lg bg-transparent text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Ажилтан сонгох
          </label>
          <select
            value={selectedWorker}
            onChange={(e) => setSelectedWorker(e.target.value)}
            className="w-full p-2 rounded-lg bg-transparent text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            <option value="" disabled>
              -- Сонгоно уу --
            </option>
            {workers.map((worker) => (
              <option key={worker._id} value={worker._id}>
                {worker.name} {worker.role && `(${worker.role})`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Огноо, цаг</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 rounded-lg bg-transparent text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition"
        >
          Захиалах
        </button>
      </form>
    </div>
  );
}
