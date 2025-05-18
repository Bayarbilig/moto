import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { CldUploadWidget } from "next-cloudinary";

type Brand = { _id: string; name: string };
type Bike = {
  brand: string;
  power: string;
  cc: string;
  bikeModel: string;
  _id: string;
  title: string;
  image?: string;
};

interface BikeManagerProps {
  brands: Brand[];
  bikes: Bike[];
  onCreateBike: (bike: {
    brand: string;
    title: string;
    bikeModel: string;
    cc: string;
    power: string;
    image: string;
  }) => Promise<void>;
  onDeleteBike: (id: string) => void;
}

export const BikeManager = ({
  brands,
  bikes,
  onCreateBike,
  onDeleteBike,
}: BikeManagerProps) => {
  const [brand, setBrand] = useState("");
  const [title, setTitle] = useState("");
  const [bikeModel, setBikeModel] = useState("");
  const [cc, setCc] = useState("");
  const [power, setPower] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onCreateBike({
        brand,
        title,
        bikeModel,
        cc,
        power,
        image: imageUrl,
      });
      setBrand("");
      setTitle("");
      setBikeModel("");
      setCc("");
      setPower("");
      setImageUrl("");
    } catch (error) {
      console.error("Error creating bike:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1a1a1a] text-white rounded-lg p-6 flex flex-col md:flex-row gap-10">
      {/* Create Bike Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Create Bike</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="brand" className="block mb-1 text-sm font-medium">
              Brand
            </label>
            <select
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
              className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select a brand</option>
              {brands.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <InputField
            id="title"
            label="Title"
            value={title}
            onChange={setTitle}
          />
          <InputField
            id="bikeModel"
            label="Bike Model"
            value={bikeModel}
            onChange={setBikeModel}
          />
          <InputField id="cc" label="CC" value={cc} onChange={setCc} />
          <InputField
            id="power"
            label="Power"
            value={power}
            onChange={setPower}
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
            {loading ? "Creating..." : "Create Bike"}
          </button>
        </form>
      </div>

      {/* Delete Bike Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">All Bikes</h2>
        <div className="max-h-[460px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-orange-600 scrollbar-track-[#222] space-y-4">
          {bikes.map((item) => (
            <div
              key={item._id}
              onClick={() => {
                if (confirm(`Delete "${item.title}"?`)) onDeleteBike(item._id);
              }}
              className="group border border-gray-700 rounded-lg overflow-hidden bg-[#2a2a2a] hover:border-orange-600 transition cursor-pointer"
            >
              <div className="flex gap-4 items-center p-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-48 h-48 object-cover rounded border border-gray-600"
                  />
                )}
                <div className="flex-1 text-sm space-y-1">
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-gray-400">Model: {item.bikeModel}</p>
                  <p className="text-gray-400">CC: {item.cc}</p>
                  <p className="text-gray-400">Power: {item.power}</p>
                  <p className="text-gray-400">Brand: {item.brand}</p>
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
