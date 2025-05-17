// components/BrandManager.tsx
import React, { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { Brand } from "./Types";

interface BrandManagerProps {
  brands: Brand[];
  onCreateBrand: (brandData: { name: string; slug: string }) => Promise<void>;
  onDeleteBrand: (id: string) => Promise<void>;
}

const BrandManager: React.FC<BrandManagerProps> = ({
  brands,
  onCreateBrand,
  onDeleteBrand,
}) => {
  const [createBrandData, setCreateBrandData] = useState({
    name: "",
    slug: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCreateBrandData({
      name: value,
      slug: value, // Auto-generate slug from name
    });
  };

  const handleSubmit = () => {
    if (!createBrandData.name) return;

    onCreateBrand(createBrandData).then(() => {
      // Reset form after successful creation
      setCreateBrandData({ name: "", slug: "" });
    });
  };

  return (
    <div className="w-fit bg-[#1a1a1a] px-4 py-14 flex gap-24 items-center text-white rounded">
      <div className="grid gap-4">
        <div>
          <label htmlFor="brand" className="block mb-1">
            Create Brand
          </label>
          <input
            id="brand"
            type="text"
            value={createBrandData.name}
            onChange={handleChange}
            required
            className="p-2 rounded bg-transparent border-2 border-gray-700 text-white"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-[#e15617] px-4 py-2 rounded"
        >
          Brand үүсгэх
        </button>
      </div>

      <div>
        <label htmlFor="brand" className="block mb-1">
          Delete Brand
        </label>
        <div
          className="w-[200px] max-h-[240px] overflow-auto scrollbar-thin scrollbar-thumb-[#e15617] scrollbar-track-[#222] rounded"
          style={{
            scrollbarColor: "#e15617 #222",
            scrollbarWidth: "thin",
          }}
        >
          {brands.map((brand) => (
            <div
              key={brand._id}
              onClick={() => onDeleteBrand(brand._id)}
              className="border border-gray-700 px-4 py-2 flex items-center w-full justify-between cursor-pointer hover:bg-gray-800"
            >
              <p>{brand.name}</p>
              <BiTrash />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandManager;
