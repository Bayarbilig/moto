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
      slug: value,
    });
  };

  const handleSubmit = () => {
    if (!createBrandData.name.trim()) return;
    onCreateBrand(createBrandData).then(() => {
      setCreateBrandData({ name: "", slug: "" });
    });
  };

  return (
    <div className="bg-[#1a1a1a] text-white rounded-lg p-6 flex flex-col md:flex-row gap-10">
      {/* Create Brand Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Шинэ Брэнд үүсгэх</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="brand" className="block mb-1 text-sm font-medium">
              Брэндийн нэр
            </label>
            <input
              id="brand"
              type="text"
              value={createBrandData.name}
              onChange={handleChange}
              placeholder="Жишээ: Yamaha"
              className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded transition disabled:opacity-50"
          >
            Үүсгэх
          </button>
        </div>
      </div>

      {/* Delete Brand Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Брэнд жагсаалт</h2>
        <div className="max-h-[200px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-orange-600 scrollbar-track-[#222] space-y-2">
          {brands.map((brand) => (
            <div
              key={brand._id}
              onClick={() => {
                if (confirm(`"${brand.name}" брэндийг устгах уу?`)) {
                  onDeleteBrand(brand._id);
                }
              }}
              className="group flex items-center justify-between bg-[#2a2a2a] border border-gray-700 rounded-lg p-3 hover:border-orange-600 transition cursor-pointer"
            >
              <span className="text-sm text-white">{brand.name}</span>
              <BiTrash className="text-red-500 text-lg group-hover:scale-110 transition" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandManager;
