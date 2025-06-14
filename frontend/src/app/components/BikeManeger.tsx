"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { BiTrash } from "react-icons/bi";
import { Bike, Brand } from "./Types";

type BikeManagerProps = {
  brands: Brand[];
  bikes: Bike[];
  onCreateBike: (bikeData: any) => Promise<void>;
  onDeleteBike: (id: any) => Promise<void>;
  onUpdateBike: (id: string, data: Partial<Bike>) => Promise<void>;
};

const InputField = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  className = "",
}: {
  id: string;
  label: string;
  value: string | number;
  onChange: (val: string) => void;
  type?: string;
  required?: boolean;
  className?: string;
}) => (
  <div className={`space-y-1 ${className}`}>
    <label htmlFor={id} className="text-sm font-medium block">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
    />
  </div>
);

export const BikeManager = ({
  brands,
  bikes,
  onDeleteBike,
}: BikeManagerProps) => {
  const [form, setForm] = useState({
    brand: "",
    title: "",
    bikeModel: "",
    cc: "",
    power: "",
    image: "",
    description: "",
    year: "",
    importedYear: "",
    price: "",
    weight: "",
    sold: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!form.brand) throw new Error("Брэнд сонгоно уу");

      const res = await fetch("/api/bike", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          year: form.year ? +form.year : undefined,
          importedYear: form.importedYear ? +form.importedYear : undefined,
          price: form.price ? +form.price : undefined,
          weight: form.weight ? +form.weight : undefined,
        }),
      });

      if (!res.ok) throw new Error("Мотоцикл нэмэхэд алдаа гарлаа");

      setForm({
        brand: "",
        title: "",
        bikeModel: "",
        cc: "",
        power: "",
        image: "",
        description: "",
        year: "",
        importedYear: "",
        price: "",
        weight: "",
        sold: false,
      });
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1a1a1a] text-white rounded-lg p-6 flex flex-col md:flex-row gap-10 w-full">
      {/* Create Bike Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Мотоцикл нэмэх</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Брэнд</label>
            <select
              value={form.brand}
              onChange={(e) => handleChange("brand", e.target.value)}
              required
              className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Брэнд сонгох</option>
              {brands.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
          <InputField
            id="title"
            label="Гарчиг *"
            value={form.title}
            onChange={(v) => handleChange("title", v)}
            required
          />
          <InputField
            id="bikeModel"
            label="Загвар *"
            value={form.bikeModel}
            onChange={(v) => handleChange("bikeModel", v)}
            required
          />
          <InputField
            id="cc"
            label="CC *"
            value={form.cc}
            onChange={(v) => handleChange("cc", v)}
            required
          />
          <InputField
            id="power"
            label="Хүч *"
            value={form.power}
            onChange={(v) => handleChange("power", v)}
            required
          />
          <InputField
            id="year"
            label="Үйлдвэрлэсэн он"
            type="number"
            value={form.year}
            onChange={(v) => handleChange("year", v)}
          />
          <InputField
            id="importedYear"
            label="Импортын он"
            type="number"
            value={form.importedYear}
            onChange={(v) => handleChange("importedYear", v)}
            required
          />
          <InputField
            id="price"
            label="Үнэ"
            type="number"
            value={form.price}
            onChange={(v) => handleChange("price", v)}
          />
          <InputField
            id="weight"
            label="Жин (кг)"
            type="number"
            value={form.weight}
            onChange={(v) => handleChange("weight", v)}
            required
          />

          <div className="space-y-2">
            <label className="text-sm font-medium block">Гол зураг</label>
            <CldUploadWidget
              uploadPreset="idkmyup"
              onSuccess={(result) => {
                const secureUrl = (result.info as { secure_url?: string })
                  ?.secure_url;
                if (secureUrl) handleChange("image", secureUrl);
              }}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open?.()}
                  className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Зураг оруулах
                </button>
              )}
            </CldUploadWidget>
            {form.image && (
              <img
                src={form.image}
                alt="Uploaded"
                className="mt-3 w-40 h-40 object-cover rounded border border-gray-700"
              />
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="text-sm font-medium block mb-1"
            >
              Тайлбар
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
              className="w-full p-3 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="sold"
              type="checkbox"
              checked={form.sold}
              onChange={(e) => handleChange("sold", e.target.checked)}
              className="w-4 h-4 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <label htmlFor="sold" className="text-sm font-medium">
              Зарагдсан уу?
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 py-2 rounded text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Нэмэгдэж байна..." : "Мотоцикл нэмэх"}
          </button>
        </form>
      </div>

      {/* Show Created Bikes */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Оруулсан мотоцикл</h2>
        <div className="max-h-[520px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-orange-600 scrollbar-track-[#222]">
          {bikes.map((bike) => (
            <div
              key={bike._id}
              className="group border border-gray-700 rounded-lg overflow-hidden bg-[#2a2a2a] hover:border-orange-600 transition cursor-pointer flex items-center gap-4 p-4"
            >
              <img
                src={bike.image}
                alt={bike.title}
                className="w-32 h-32 object-cover rounded border border-gray-600"
              />
              <div className="flex-1 text-sm space-y-1">
                <p className="font-semibold text-white">{bike.title}</p>
                <p className="text-gray-400">Загвар: {bike.bikeModel}</p>
                <p className="text-[#e15617]">
                  {bike.price?.toLocaleString() ?? "?"} ₮
                </p>
              </div>
              <BiTrash
                onClick={() => onDeleteBike(bike._id)}
                className="text-red-500 text-xl hover:scale-110 transition cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
