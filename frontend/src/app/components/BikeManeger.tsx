import { useEffect, useState, useCallback } from "react";
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

interface BikeData {
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

interface BikeManagerProps {
  brands: Brand[];
  bikes: Bike[];
  onCreateBike: (bike: BikeData) => Promise<void>;
  onUpdateBike: (id: string, bike: BikeData) => Promise<void>;
  onDeleteBike: (id: string) => void;
}

export const BikeManager = ({
  brands,
  bikes,
  onCreateBike,
  onUpdateBike,
  onDeleteBike,
}: BikeManagerProps) => {
  // Form state
  const [formData, setFormData] = useState<BikeData>({
    brand: "",
    title: "",
    bikeModel: "",
    cc: "",
    power: "",
    images: [],
    details: "",
    price: 0,
    discount: "",
    saled: false,
  });

  // UI state
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 5;

  // Update form when bike is selected
  useEffect(() => {
    if (selectedBike) {
      setFormData({
        brand: selectedBike.brand,
        title: selectedBike.title,
        bikeModel: selectedBike.bikeModel,
        cc: selectedBike.cc,
        power: selectedBike.power,
        images: selectedBike.images || [],
        details: selectedBike.details,
        price: selectedBike.price,
        discount: selectedBike.discount || "",
        saled: selectedBike.saled || false,
      });
    }
  }, [selectedBike]);

  const resetForm = useCallback(() => {
    setFormData({
      brand: "",
      title: "",
      bikeModel: "",
      cc: "",
      power: "",
      images: [],
      details: "",
      price: 0,
      discount: "",
      saled: false,
    });
    setSelectedBike(null);
    setError(null);
  }, []);

  const updateFormField = useCallback(
    <K extends keyof BikeData>(field: K, value: BikeData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setError(null); // Clear error when user starts typing
    },
    []
  );

  const validateForm = (): boolean => {
    if (
      !formData.brand ||
      !formData.title ||
      !formData.bikeModel ||
      !formData.cc ||
      !formData.power ||
      !formData.details
    ) {
      setError("Please fill in all required fields");
      return false;
    }
    if (formData.price <= 0) {
      setError("Price must be greater than 0");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      if (selectedBike) {
        await onUpdateBike(selectedBike._id, formData);
      } else {
        await onCreateBike(formData);
      }
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUploadSuccess = useCallback(
    (result: any) => {
      const url = result.info?.secure_url;
      if (typeof url === "string") {
        updateFormField("images", [...formData.images, url]);
      }
      setUploading(false);
    },
    [formData.images, updateFormField]
  );

  const removeImage = useCallback(
    (index: number) => {
      updateFormField(
        "images",
        formData.images.filter((_, i) => i !== index)
      );
    },
    [formData.images, updateFormField]
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent, bike: Bike) => {
      e.stopPropagation();
      if (window.confirm(`Delete "${bike.title}"?`)) {
        onDeleteBike(bike._id);
        if (selectedBike?._id === bike._id) {
          resetForm();
        }
      }
    },
    [onDeleteBike, selectedBike, resetForm]
  );

  // Memoized filtered and paginated bikes
  const filteredBikes = bikes.filter((bike) =>
    [bike.title, bike.brand, bike.bikeModel].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredBikes.length / itemsPerPage);
  const paginatedBikes = filteredBikes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const formatPrice = (price: number) => `${price.toLocaleString("en-US")}₮`;

  const getBrandName = (brandId: string) =>
    brands.find((b) => b._id === brandId)?.name || brandId;

  return (
    <div className="bg-[#1a1a1a] text-white rounded-lg p-6 flex flex-col md:flex-row gap-10">
      {/* Form Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">
          {selectedBike ? "Update Bike" : "Create Bike"}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-600 rounded text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <SelectField
            id="brand"
            label="Brand"
            value={formData.brand}
            onChange={(value) => updateFormField("brand", value)}
            options={brands.map((b) => ({ value: b._id, label: b.name }))}
            placeholder="Select a brand"
          />

          <InputField
            id="title"
            label="Title"
            value={formData.title}
            onChange={(value) => updateFormField("title", value)}
          />

          <InputField
            id="bikeModel"
            label="Bike Model"
            value={formData.bikeModel}
            onChange={(value) => updateFormField("bikeModel", value)}
          />

          <InputField
            id="cc"
            label="CC"
            value={formData.cc}
            onChange={(value) => updateFormField("cc", value)}
          />

          <InputField
            id="power"
            label="Power"
            value={formData.power}
            onChange={(value) => updateFormField("power", value)}
          />

          <NumberField
            id="price"
            label="Price"
            value={formData.price}
            onChange={(value) => updateFormField("price", value)}
          />

          <InputField
            id="discount"
            label="Discount (%)"
            value={formData.discount}
            onChange={(value) => updateFormField("discount", value)}
            required={false}
          />

          <CheckboxField
            id="saled"
            label="Saled"
            checked={formData.saled}
            onChange={(checked) => updateFormField("saled", checked)}
          />

          <TextAreaField
            id="details"
            label="Details"
            value={formData.details}
            onChange={(value) => updateFormField("details", value)}
          />

          <ImageUploadSection
            images={formData.images}
            uploading={uploading}
            onUploadStart={() => setUploading(true)}
            onUploadSuccess={handleImageUploadSuccess}
            onRemoveImage={removeImage}
          />

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded transition disabled:opacity-50"
            >
              {loading
                ? selectedBike
                  ? "Updating..."
                  : "Creating..."
                : selectedBike
                ? "Update Bike"
                : "Create Bike"}
            </button>

            {selectedBike && (
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

      {/* List Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">
          All Bikes ({bikes.length})
        </h2>

        <SearchField
          value={search}
          onChange={setSearch}
          placeholder="Search by title, model, or brand..."
        />

        <div className="max-h-[700px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-orange-600 scrollbar-track-[#222] space-y-4">
          {paginatedBikes.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              {search
                ? "No bikes found matching your search."
                : "No bikes available."}
            </div>
          ) : (
            paginatedBikes.map((bike) => (
              <BikeCard
                key={bike._id}
                bike={bike}
                isSelected={selectedBike?._id === bike._id}
                brandName={getBrandName(bike.brand)}
                formatPrice={formatPrice}
                onSelect={() => setSelectedBike(bike)}
                onDelete={(e) => handleDelete(e, bike)}
              />
            ))
          )}
        </div>

        {totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

// Reusable Components
const InputField = ({
  id,
  label,
  value,
  onChange,
  required = true,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) => (
  <div>
    <label htmlFor={id} className="block mb-1 text-sm font-medium">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <input
      id={id}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
    />
  </div>
);

const SelectField = ({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder: string;
}) => (
  <div>
    <label htmlFor={id} className="block mb-1 text-sm font-medium">
      {label} <span className="text-red-400">*</span>
    </label>
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const NumberField = ({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const numValue = parseFloat(rawValue);
    if (!isNaN(numValue)) {
      onChange(numValue);
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block mb-1 text-sm font-medium">
        {label} <span className="text-red-400">*</span>
      </label>
      <input
        id={id}
        type="text"
        value={value.toLocaleString()}
        onChange={handleChange}
        required
        className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  );
};

const CheckboxField = ({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="w-4 h-4"
    />
    <label htmlFor={id} className="text-sm font-medium">
      {label}
    </label>
  </div>
);

const TextAreaField = ({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => (
  <div>
    <label htmlFor={id} className="block mb-1 text-sm font-medium">
      {label} <span className="text-red-400">*</span>
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

const SearchField = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full mb-4 p-2 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
  />
);

const ImageUploadSection = ({
  images,
  uploading,
  onUploadStart,
  onUploadSuccess,
  onRemoveImage,
}: {
  images: string[];
  uploading: boolean;
  onUploadStart: () => void;
  onUploadSuccess: (result: any) => void;
  onRemoveImage: (index: number) => void;
}) => (
  <div>
    <label className="block mb-2 text-sm font-medium">Upload Images</label>
    <CldUploadWidget
      uploadPreset="idkmyup"
      onOpen={onUploadStart}
      onSuccess={onUploadSuccess}
    >
      {({ open }) => (
        <button
          type="button"
          onClick={() => open?.()}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      )}
    </CldUploadWidget>

    {images.length > 0 && (
      <div className="mt-3 flex flex-wrap gap-4">
        {images.map((url, index) => (
          <div key={index} className="relative group">
            <img
              src={url}
              alt={`Upload ${index + 1}`}
              className="w-32 h-32 object-cover rounded border border-gray-700"
            />
            <button
              type="button"
              onClick={() => onRemoveImage(index)}
              className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

const BikeCard = ({
  bike,
  isSelected,
  brandName,
  formatPrice,
  onSelect,
  onDelete,
}: {
  bike: Bike;
  isSelected: boolean;
  brandName: string;
  formatPrice: (price: number) => string;
  onSelect: () => void;
  onDelete: (e: React.MouseEvent) => void;
}) => (
  <div
    onClick={onSelect}
    className={`border border-gray-700 rounded-lg overflow-hidden bg-[#2a2a2a] hover:border-orange-600 transition cursor-pointer ${
      isSelected ? "border-orange-600" : ""
    }`}
  >
    <div className="flex gap-4 items-center p-4">
      {bike.images?.[0] && (
        <img
          src={bike.images[0]}
          alt={bike.title}
          className="w-24 h-24 object-cover rounded border border-gray-600"
        />
      )}
      <div className="flex-1 text-sm space-y-1">
        <p className="font-semibold text-white">{bike.title}</p>
        <p className="text-gray-400">Model: {bike.bikeModel}</p>
        <p className="text-gray-400">CC: {bike.cc}</p>
        <p className="text-gray-400">Power: {bike.power}</p>
        <p className="text-gray-400">Brand: {brandName}</p>
        <p className="text-[#e15617]">{formatPrice(bike.price)}</p>
        {bike.discount && (
          <p className="text-green-400">Discount: {bike.discount}%</p>
        )}
        {bike.saled && <p className="text-red-400 font-semibold">Sold</p>}
      </div>
      <BiTrash
        className="text-red-500 text-xl hover:scale-110 transition"
        onClick={onDelete}
      />
    </div>
  </div>
);

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => (
  <div className="flex justify-center items-center gap-2 mt-4">
    <button
      onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
      disabled={currentPage === 1}
      className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
    >
      Prev
    </button>
    <span>
      {currentPage} / {totalPages}
    </span>
    <button
      onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
    >
      Next
    </button>
  </div>
);
