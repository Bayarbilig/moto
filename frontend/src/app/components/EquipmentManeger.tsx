import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { CldUploadWidget } from "next-cloudinary";

export type EquipmentItem = {
  _id: string;
  name: string;
  brand?: string;
  price?: string;
  image?: string;
};

interface EquipmentManagerProps {
  equipment: EquipmentItem[];
  onCreateEquipment: (data: {
    name: string;
    brand: string;
    price: string;
    image: string;
  }) => Promise<void>;
  onDeleteEquipment: (id: string) => void;
}

export const EquipmentManager = ({
  equipment,
  onCreateEquipment,
  onDeleteEquipment,
}: EquipmentManagerProps) => {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onCreateEquipment({
        ...form,
        image: imageUrl,
      });
      setForm({ name: "", brand: "", price: "" });
      setImageUrl("");
    } catch (error) {
      console.error("Error creating equipment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1a1a1a] text-white rounded-lg p-6 flex flex-col md:flex-row gap-10">
      {/* Create Equipment Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Create Equipment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input fields */}
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
            value={form.price}
            onChange={handleChange}
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
            {loading ? "Creating..." : "Create Equipment"}
          </button>
        </form>
      </div>

      {/* Delete Equipment Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">All Equipment</h2>
        <div className="max-h-[460px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-orange-600 scrollbar-track-[#222] space-y-4">
          {equipment.map((item) => (
            <div
              key={item._id}
              onClick={() => {
                if (confirm(`Delete "${item.name}"?`))
                  onDeleteEquipment(item._id);
              }}
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
                  <p className="text-gray-400">Price: {item.price}</p>
                </div>
                <BiTrash className="text-red-500 text-xl hover:scale-110 transition" />
              </div>
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
