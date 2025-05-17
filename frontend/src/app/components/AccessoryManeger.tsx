// components/AccessoryManager.tsx
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
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    price: "",
    brand: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageUrl) {
      alert("Please upload an image.");
      return;
    }

    onCreateAccessory({ ...formData, image: imageUrl }).then(() => {
      // Reset form on success
      setFormData({ price: "", brand: "", name: "" });
      setImageUrl("");
    });
  };

  return (
    <div className="p-6 bg-[#1a1a1a] rounded-xl w-[800px] flex gap-12">
      <form onSubmit={handleSubmit} className="grid gap-2 text-white flex-1">
        <label htmlFor="Accessory" className="block mb-1 text-white">
          Create Accessory
        </label>

        <label htmlFor="Image" className="block mb-1 text-white">
          Upload Image
        </label>
        <CldUploadWidget
          uploadPreset="idkmyup"
          onSuccess={(result) => {
            if (
              result.info &&
              typeof result.info === "object" &&
              "secure_url" in result.info &&
              typeof (result.info as any).secure_url === "string"
            ) {
              setImageUrl((result.info as any).secure_url);
            }
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open?.()}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 w-fit text-white"
            >
              Upload Image
            </button>
          )}
        </CldUploadWidget>

        {imageUrl && (
          <div className="mt-2">
            <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "200px" }} />
          </div>
        )}

        <label htmlFor="Price" className="block mb-1 text-white">
          Price
        </label>
        <input
          type="text"
          name="price"
          placeholder="Price (₮155000)"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 rounded bg-transparent border-gray-700"
          required
        />

        <label htmlFor="Brand" className="block mb-1 text-white">
          Brand
        </label>
        <input
          type="text"
          name="brand"
          placeholder="Brand (e.g., МАСКА)"
          value={formData.brand}
          onChange={handleChange}
          className="border p-2 rounded bg-transparent border-gray-700"
          required
        />

        <label htmlFor="Name" className="block mb-1 text-white">
          Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Product Name (e.g., FOX JERSEY)"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded bg-transparent border-gray-700"
          required
        />

        <button
          type="submit"
          className="bg-[#e15617] text-white py-2 rounded hover:bg-[#e15617]"
        >
          Create Accessory
        </button>
      </form>

      <div className="flex-1 grid h-fit text-white">
        <label htmlFor="accessories" className="mb-1">
          Delete Accessory
        </label>
        <div
          className="max-h-[240px] overflow-auto scrollbar-thin scrollbar-thumb-[#e15617] scrollbar-track-[#222] rounded"
          style={{
            scrollbarColor: "#e15617 #222",
            scrollbarWidth: "thin",
          }}
        >
          {accessories.map((item) => (
            <div
              key={item._id}
              onClick={() => onDeleteAccessory(item._id)}
              className="border border-gray-700 px-4 w-full py-2 flex items-center justify-between cursor-pointer hover:bg-gray-800"
            >
              <div className="flex items-center gap-2">
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-16 h-16" />
                )}
                <p>{item.name}</p>
              </div>
              <BiTrash />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccessoryManager;
