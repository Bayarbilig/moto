import React, { useEffect, useState } from "react";
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
    discount: string;
    details: string;
  }) => Promise<void>;
  onDeleteAccessory: (id: string) => Promise<void>;
  onUpdateAccessory: (
    id: string,
    accessoryData: {
      image: string;
      price: string;
      brand: string;
      name: string;
      discount: string;
      details: string;
    }
  ) => Promise<void>;
}

const AccessoryManager: React.FC<AccessoryManagerProps> = ({
  accessories,
  onCreateAccessory,
  onDeleteAccessory,
  onUpdateAccessory,
}) => {
  const [choosedAccessory, setChoosedAccessory] = useState<Accessory | null>(
    null
  );

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("0");
  const [details, setDetails] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔎 Search state
  const [search, setSearch] = useState("");

  // 📄 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (choosedAccessory) {
      setName(choosedAccessory.name);
      setBrand(choosedAccessory.brand);
      setPrice(choosedAccessory.price);
      setDiscount(choosedAccessory.discount || "0");
      setDetails(choosedAccessory.details || "");
      setImageUrl(choosedAccessory.image || "");
    }
  }, [choosedAccessory]);

  const resetForm = () => {
    setChoosedAccessory(null);
    setName("");
    setBrand("");
    setPrice("");
    setDiscount("0");
    setDetails("");
    setImageUrl("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageUrl) {
      alert("Зураг оруулна уу.");
      return;
    }
    setLoading(true);
    try {
      if (choosedAccessory) {
        await onUpdateAccessory(choosedAccessory._id, {
          name,
          brand,
          price,
          discount,
          details,
          image: imageUrl,
        });
        resetForm();
      } else {
        await onCreateAccessory({
          name,
          brand,
          price,
          discount,
          details,
          image: imageUrl,
        });
        resetForm();
      }
    } catch (error) {
      console.error("Error saving accessory:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Filter accessories by search
  const filteredAccessories = accessories.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.brand.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredAccessories.length / itemsPerPage);
  const paginatedAccessories = filteredAccessories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-[#1a1a1a] text-white rounded-lg p-6 flex flex-col md:flex-row gap-10 w-full">
      {/* Create / Update Accessory Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">
          {choosedAccessory ? "Update Accessory" : "Create Accessory"}
        </h2>
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
          <InputField
            id="discount"
            label="Discount (%)"
            value={discount}
            onChange={setDiscount}
          />

          {/* Details */}
          <div>
            <label htmlFor="details" className="block mb-1 text-sm font-medium">
              Details
            </label>
            <textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
              className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Upload / Remove Image */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Upload Image
            </label>

            {imageUrl ? (
              <div className="mt-3 space-y-2 relative group w-fit">
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="w-40 h-40 object-cover rounded border border-gray-700"
                />
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition"
                >
                  ×
                </button>
              </div>
            ) : (
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
            )}
          </div>

          {/* Submit & Cancel buttons */}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded transition disabled:opacity-50"
            >
              {loading
                ? choosedAccessory
                  ? "Updating..."
                  : "Creating..."
                : choosedAccessory
                ? "Update Accessory"
                : "Create Accessory"}
            </button>

            {choosedAccessory && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Delete / Select Accessory Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">All Accessories</h2>

        {/* 🔎 Search bar */}
        <input
          type="text"
          placeholder="Search by name or brand..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full mb-4 p-2 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <div className="max-h-[460px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-orange-600 scrollbar-track-[#222] space-y-4 rounded border border-gray-700 divide-y divide-gray-700">
          {paginatedAccessories.map((item) => (
            <div
              onClick={() => setChoosedAccessory(item)}
              key={item._id}
              className={`group border border-gray-700 rounded-lg overflow-hidden bg-[#2a2a2a] hover:border-orange-600 ${
                choosedAccessory?._id === item._id ? "border-orange-600" : ""
              } transition cursor-pointer flex items-center gap-4 p-4`}
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
                {item.discount && (
                  <p className="text-green-400">Discount: {item.discount}%</p>
                )}
                {item.details && (
                  <p className="text-gray-300 line-clamp-2">{item.details}</p>
                )}
              </div>
              <BiTrash
                className="text-red-500 text-xl hover:scale-110 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Delete "${item.name}"?`))
                    onDeleteAccessory(item._id);
                }}
              />
            </div>
          ))}
        </div>

        {/* 📄 Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
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
