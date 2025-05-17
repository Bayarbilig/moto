import React, { useState } from "react";
import axios from "axios";
import { api } from "@/lib/axios";

export default function AddWorkerForm() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/api/worker", { name, role });
      setMessage("Ажилтан амжилттай нэмэгдлээ!");
      setName("");
      setRole("");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Алдаа гарлаа");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#1a1a1a] p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-white">Ажилтан нэмэх</h2>
      {message && <p className="text-green-600 mb-2">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Нэр"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded bg-transparent border-gray-700 text-white"
          required
        />
        <input
          type="text"
          placeholder="Ажил үүрэг (ж.н. засварчин , захирал)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded bg-transparent border-gray-700 text-white"
          required
        />
        <button
          type="submit"
          className="bg-[#ea580c] text-white py-2 px-4 rounded hover:bg-[#ea580c]"
        >
          Нэмэх
        </button>
      </form>
    </div>
  );
}
