import { useState, useEffect } from "react";
import { BiTrash } from "react-icons/bi";
import { CldUploadWidget } from "next-cloudinary";

type EquipmentItem = {
  _id: string;
  name: string;
  brand?: string;
  price?: string;
  image?: string;
  discount?: string;
  details?: string;
};

interface EquipmentManagerProps {
  equipment: EquipmentItem[];
  onCreateEquipment: (data: {
    name: string;
    brand: string;
    price: string;
    image: string;
    discount?: string;
    details?: string;
  }) => Promise<void>;
  onUpdateEquipment: (
    id: string,
    data: {
      name: string;
      brand: string;
      price: string;
      image: string;
      discount?: string;
      details?: string;
    }
  ) => Promise<void>;
  onDeleteEquipment: (id: string) => void;
}

export const EquipmentManager = ({
  equipment,
  onCreateEquipment,
  onUpdateEquipment,
  onDeleteEquipment,
}: EquipmentManagerProps) => {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    discount: "",
    details: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [choosedEquipment, setChoosedEquipment] =
    useState<EquipmentItem | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(equipment.length / itemsPerPage);

  const paginatedEquipment = equipment.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (choosedEquipment) {
      setForm({
        name: choosedEquipment.name || "",
        brand: choosedEquipment.brand || "",
        price: choosedEquipment.price || "",
        discount: choosedEquipment.discount || "",
        details: choosedEquipment.details || "",
      });
      setImageUrl(choosedEquipment.image || "");
    }
  }, [choosedEquipment]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, "");
    if (!isNaN(Number(raw))) {
      setForm((prev) => ({ ...prev, price: raw }));
    }
  };

  const formatPrice = (price: string) => {
    if (!price) return "";
    const num = Number(price.replace(/,/g, ""));
    if (isNaN(num)) return price;
    return num.toLocaleString();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (choosedEquipment) {
        await onUpdateEquipment(choosedEquipment._id, {
          ...form,
          image: imageUrl,
        });
      } else {
        await onCreateEquipment({
          ...form,
          image: imageUrl,
        });
      }
      resetForm();
    } catch (error) {
      console.error("Error saving equipment:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ name: "", brand: "", price: "", discount: "", details: "" });
    setImageUrl("");
    setChoosedEquipment(null);
    setLoading(false);
  };

  return (
    <div className="bg-[#1a1a1a] text-white rounded-lg p-6 flex flex-col md:flex-row gap-10">
      {/* Create/Update Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">
          {choosedEquipment ? "Update Equipment" : "Create Equipment"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            id="name"
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <InputField
            id="brand"
            label="Brand"
            name="brand"
            value={form.brand}
            onChange={handleChange}
          />
          <InputField
            id="price"
            label="Price"
            name="price"
            value={formatPrice(form.price)}
            onChange={handlePriceChange}
          />
          <InputField
            id="discount"
            label="Discount (%)"
            name="discount"
            value={form.discount}
            onChange={handleChange}
          />
          <TextArea
            id="details"
            label="Details"
            name="details"
            value={form.details}
            onChange={handleChange}
          />

          {/* Upload Image */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Upload Image
            </label>

            {imageUrl && (
              <div className="mb-2 flex items-center gap-2 relative group w-fit">
                <img
                  src={imageUrl}
                  alt="Current"
                  className="w-32 h-32 object-cover rounded border border-gray-700"
                />
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition"
                >
                  ×
                </button>
              </div>
            )}

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
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded transition disabled:opacity-50"
            >
              {loading
                ? choosedEquipment
                  ? "Updating..."
                  : "Creating..."
                : choosedEquipment
                ? "Update Equipment"
                : "Create Equipment"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-4 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Equipment List */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">All Equipment</h2>
        <div className="max-h-[460px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-orange-600 scrollbar-track-[#222] space-y-4">
          {paginatedEquipment.map((item) => (
            <div
              key={item._id}
              onClick={() => setChoosedEquipment(item)}
              className="group border border-gray-700 rounded-lg overflow-hidden bg-[#2a2a2a] hover:border-orange-600 transition cursor-pointer"
            >
              <div className="flex gap-4 items-center p-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-40 h-40 object-cover rounded border border-gray-600"
                  />
                )}
                <div className="flex-1 text-sm space-y-1">
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-gray-400">Brand: {item.brand}</p>
                  <p className="text-gray-400">
                    Price: {formatPrice(item.price || "")}
                  </p>
                  {item.discount && (
                    <p className="text-green-400">Discount: {item.discount}%</p>
                  )}
                  {item.details && (
                    <p className="text-gray-300">{item.details}</p>
                  )}
                </div>
                <BiTrash
                  className="text-red-500 text-xl hover:scale-110 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Delete "${item.name}"?`))
                      onDeleteEquipment(item._id);
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 py-1 bg-gray-800 rounded">
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

/* Reusable Components */
const InputField = ({
  id,
  label,
  name,
  value,
  onChange,
}: {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div>
    <label htmlFor={id} className="block mb-1 text-sm font-medium">
      {label}
    </label>
    <input
      id={id}
      name={name}
      type="text"
      value={value}
      onChange={onChange}
      required
      className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
    />
  </div>
);

const TextArea = ({
  id,
  label,
  name,
  value,
  onChange,
}: {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => (
  <div>
    <label htmlFor={id} className="block mb-1 text-sm font-medium">
      {label}
    </label>
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      rows={4}
      className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
    />
  </div>
);
