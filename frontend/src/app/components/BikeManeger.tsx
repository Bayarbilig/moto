import { useEffect, useState } from "react";
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
  images?: string[];
  details: string;
  price: number;
  discount?: string;
  saled?: boolean;
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
    images: string[];
    details: string;
    price: number;
    discount: string;
    saled: boolean;
  }) => Promise<void>;
  onUpdateBike: (
    id: string,
    bike: {
      brand: string;
      title: string;
      bikeModel: string;
      cc: string;
      power: string;
      images: string[];
      details: string;
      price: number;
      discount: string;
      saled: boolean;
    }
  ) => Promise<void>;
  onDeleteBike: (id: string) => void;
}

export const BikeManager = ({
  brands,
  bikes,
  onCreateBike,
  onUpdateBike,
  onDeleteBike,
}: BikeManagerProps) => {
  const [choosedBike, setChoosedBike] = useState<Bike | null>(null);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [title, setTitle] = useState("");
  const [bikeModel, setBikeModel] = useState("");
  const [cc, setCc] = useState("");
  const [power, setPower] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<string>("");
  const [saled, setSaled] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Image upload progress
  const [uploading, setUploading] = useState(false);
  const [uploadCancel, setUploadCancel] = useState(false);

  useEffect(() => {
    if (choosedBike) {
      setBrand(choosedBike.brand);
      setTitle(choosedBike.title);
      setBikeModel(choosedBike.bikeModel);
      setCc(choosedBike.cc);
      setPower(choosedBike.power);
      setDetails(choosedBike.details);
      setPrice(choosedBike.price);
      setDiscount(choosedBike.discount ?? "");
      setSaled(choosedBike.saled ?? false);
      setImageUrls(choosedBike.images ?? []);
    }
  }, [choosedBike]);

  const resetForm = () => {
    setBrand("");
    setTitle("");
    setBikeModel("");
    setCc("");
    setPower("");
    setDetails("");
    setPrice(0);
    setDiscount("");
    setSaled(false);
    setImageUrls([]);
    setChoosedBike(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (choosedBike) {
        await onUpdateBike(choosedBike._id, {
          brand,
          title,
          bikeModel,
          cc,
          power,
          images: imageUrls,
          details,
          price,
          discount,
          saled,
        });
      } else {
        await onCreateBike({
          brand,
          title,
          bikeModel,
          cc,
          power,
          images: imageUrls,
          details,
          price,
          discount,
          saled,
        });
      }
      resetForm();
    } catch (error) {
      console.error("Error saving bike:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => price.toLocaleString("en-US") + "₮";

  const filteredBikes = bikes.filter(
    (bike) =>
      bike.title.toLowerCase().includes(search.toLowerCase()) ||
      bike.brand.toLowerCase().includes(search.toLowerCase()) ||
      bike.bikeModel.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredBikes.length / itemsPerPage);
  const paginatedBikes = filteredBikes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-[#1a1a1a] text-white rounded-lg p-6 flex flex-col md:flex-row gap-10">
      {/* Create/Update Bike Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">
          {choosedBike ? "Update Bike" : "Create Bike"}
        </h2>
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
          <InputFieldNumberFormatted
            id="price"
            label="Price"
            value={price}
            onChange={setPrice}
          />
          <InputField
            id="discount"
            label="Discount (%)"
            value={discount}
            onChange={setDiscount}
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="saled"
              checked={saled}
              onChange={(e) => setSaled(e.target.checked)}
            />
            <label htmlFor="saled" className="text-sm font-medium">
              Saled
            </label>
          </div>

          <TextArea
            id="details"
            label="Details"
            value={details}
            onChange={setDetails}
          />

          {/* Upload Multiple Images with cancel */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Upload Images
            </label>
            <CldUploadWidget
              uploadPreset="idkmyup"
              onOpen={() => {
                setUploading(true);
                setUploadCancel(false);
              }}
              onSuccess={(result) => {
                const url = (result.info as any)?.secure_url;
                if (!uploadCancel && typeof url === "string") {
                  setImageUrls((prev) => [...prev, url]);
                }
                setUploading(false);
              }}
            >
              {({ open }) => (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => open?.()}
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                    disabled={uploading}
                  >
                    {uploading ? "Uploading..." : "Upload Image"}
                  </button>
                  {uploading && (
                    <button
                      type="button"
                      onClick={() => setUploadCancel(true)}
                      className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              )}
            </CldUploadWidget>

            {imageUrls.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-4">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Uploaded ${index + 1}`}
                      className="w-32 h-32 object-cover rounded border border-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setImageUrls((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                      className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded transition disabled:opacity-50"
            >
              {loading
                ? choosedBike
                  ? "Updating..."
                  : "Creating..."
                : choosedBike
                ? "Update Bike"
                : "Create Bike"}
            </button>
            {choosedBike && (
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

      {/* Bike List Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">All Bikes</h2>

        <input
          type="text"
          placeholder="Search by title, model, or brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
        />

        <div className="max-h-[700px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-orange-600 scrollbar-track-[#222] space-y-4">
          {paginatedBikes.map((item) => (
            <div
              key={item._id}
              onClick={() => setChoosedBike(item)}
              className={`group border border-gray-700 rounded-lg overflow-hidden bg-[#2a2a2a] hover:border-orange-600 transition cursor-pointer ${
                choosedBike?._id === item._id ? "border-orange-600" : ""
              }`}
            >
              <div className="flex gap-4 items-center p-4">
                {item.images && item.images[0] && (
                  <img
                    src={item.images[0]}
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
                  {item.price && (
                    <p className="text-[#e15617]">{formatPrice(item.price)}</p>
                  )}
                  {item.discount && (
                    <p className="text-green-400">Discount: {item.discount}%</p>
                  )}
                  {item.saled && (
                    <p className="text-red-400 font-semibold">Saled</p>
                  )}
                </div>
                <BiTrash
                  className="text-red-500 text-xl hover:scale-110 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Delete "${item.title}"?`))
                      onDeleteBike(item._id);
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* Reusable Components (unchanged) */
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

const InputFieldNumberFormatted = ({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (val: number) => void;
}) => {
  const [displayValue, setDisplayValue] = useState(value.toLocaleString());
  useEffect(() => setDisplayValue(value.toLocaleString()), [value]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, "");
    if (!isNaN(Number(raw))) {
      onChange(Number(raw));
      setDisplayValue(Number(raw).toLocaleString());
    } else setDisplayValue(e.target.value);
  };
  return (
    <div>
      <label htmlFor={id} className="block mb-1 text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={displayValue}
        onChange={handleChange}
        required
        className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  );
};

const TextArea = ({
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
    <textarea
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      rows={4}
      className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
    />
  </div>
);
