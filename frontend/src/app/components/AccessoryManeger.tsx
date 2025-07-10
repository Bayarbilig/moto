import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { BiTrash } from "react-icons/bi";
import { Accessory } from "./Types";

interface AccessoryManagerProps {
  accessories: Accessory[];
  onCreateAccessory: (accessoryData: {
    image: string;
    price: string;
    brand: string;
    name: string;
  }) => Promise<void>;
  onDeleteAccessory: (id: string) => Promise<void>;
}

const AccessoryManager: React.FC<AccessoryManagerProps> = ({
  accessories,
  onCreateAccessory,
  onDeleteAccessory,
}) => {
  // Тус бүр state-үүдийг тусдаа хадгална
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageUrl) {
      alert("Зураг оруулна уу.");
      return;
    }
    setLoading(true);
    try {
      await onCreateAccessory({ name, brand, price, image: imageUrl });
      setName("");
      setBrand("");
      setPrice("");
      setImageUrl("");
    } catch (error) {
      console.error("Error creating accessory:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1a1a1a] text-white rounded-lg p-6 flex flex-col md:flex-row gap-10 w-full">
      {/* Create Accessory Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Create Accessory</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField id="name" label="Name" value={name} onChange={setName} />
          <InputField
            id="brand"
            label="Brand"
            value={brand}
            onChange={setBrand}
          />
          <InputField
            id="price"
            label="Price (₮)"
            value={price}
            onChange={setPrice}
          />

          {/* Upload Image */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Upload Image
            </label>
            <CldUploadWidget
              uploadPreset="idkmyup"
              onSuccess={(result) => {
                const url = (result.info as any)?.secure_url;
                if (typeof url === "string") setImageUrl(url);
              }}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open?.()}
                  className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Upload Image
                </button>
              )}
            </CldUploadWidget>

            {imageUrl && (
              <div className="mt-3">
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="w-40 h-40 object-cover rounded border border-gray-700"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Accessory"}
          </button>
        </form>
      </div>

      {/* Delete Accessory Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">All Accessories</h2>
        <div className="max-h-[460px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-orange-600 scrollbar-track-[#222] space-y-4 rounded border border-gray-700 divide-y divide-gray-700">
          {accessories.map((item) => (
            <div
              key={item._id}
              onClick={() => {
                if (confirm(`Delete "${item.name}"?`))
                  onDeleteAccessory(item._id);
              }}
              className="group border border-gray-700 rounded-lg overflow-hidden bg-[#2a2a2a] hover:border-orange-600 transition cursor-pointer flex items-center gap-4 p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover rounded border border-gray-600"
              />
              <div className="flex-1 text-sm space-y-1">
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-gray-400">Brand: {item.brand}</p>
                <p className="text-[#e15617]">{item.price}₮</p>
              </div>
              <BiTrash className="text-red-500 text-xl hover:scale-110 transition" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const InputField = ({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
}) => (
  <div>
    <label htmlFor={id} className="block mb-1 text-sm font-medium">
      {label}
    </label>
    <input
      id={id}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
    />
  </div>
);

export default AccessoryManager;
