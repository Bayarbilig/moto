import React, { useEffect, useState } from "react";
import { api } from "@/lib/axios";

interface Booking {
  _id: string;
  customerName: string;
  date: string;
}

interface Worker {
  _id: string;
  name: string;
  role?: string;
}

export default function WorkerList() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get("/api/worker")
      .then((res) => setWorkers(res.data))
      .catch(() => setMessage("Ажилтнуудыг авч чадсангүй."));
  }, []);

  useEffect(() => {
    if (!selectedWorkerId) {
      setBookings([]);
      return;
    }
    setLoading(true);
    api
      .get(`/api/booking/${selectedWorkerId}`)
      .then((res) => setBookings(res.data))
      .catch(() => setMessage("Захиалгуудыг авч чадсангүй."))
      .finally(() => setLoading(false));
  }, [selectedWorkerId]);

  const handleDelete = async (bookingId: string) => {
    if (!confirm("Энэ захиалгыг устгах уу?")) return;
    try {
      await api.delete(`/api/booking/${bookingId}`);
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      setMessage("Захиалга амжилттай устгагдлаа.");
    } catch {
      setMessage("Захиалгыг устгах үед алдаа гарлаа.");
    }
  };

  return (
    <div className="w-[600px] p-6 bg-[#1a1a1a] rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white text-center">
        Ажилчдын захиалгууд
      </h2>

      {message && (
        <p className="mb-4 text-center text-sm text-blue-400">{message}</p>
      )}

      <select
        value={selectedWorkerId}
        onChange={(e) => setSelectedWorkerId(e.target.value)}
        className="w-full mb-6 p-2 border border-gray-700 rounded bg-transparent text-white"
      >
        <option value="" className="bg-[#1a1a1a]">
          Ажилтан сонгох
        </option>
        {workers.map((worker) => (
          <option key={worker._id} value={worker._id} className="bg-[#1a1a1a]">
            {worker.name} {worker.role ? `(${worker.role})` : ""}
          </option>
        ))}
      </select>

      {loading ? (
        <p className="text-center text-white">Түр хүлээнэ үү...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-400">Захиалга байхгүй байна.</p>
      ) : (
        <ul className="space-y-3">
          {bookings.map((booking) => (
            <li
              key={booking._id}
              className="flex justify-between items-center p-3 bg-[#222222] rounded"
            >
              <div>
                <span className="font-semibold text-white">
                  {booking.customerName}
                </span>{" "}
                —{" "}
                <span className="text-gray-300">
                  {new Date(booking.date).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => handleDelete(booking._id)}
                className="ml-4 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition"
                aria-label="Захиалгыг устгах"
              >
                Устгах
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
