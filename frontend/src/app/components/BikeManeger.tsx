import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { CldUploadWidget } from "next-cloudinary";

// BikeManager Component
type Brand = { _id: string; name: string };
type Bike = { _id: string; title: string; image?: string };

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

  interface CreateBikeFormData {
    brand: string;
    title: string;
    bikeModel: string;
    cc: string;
    power: string;
    image: string;
  }

  interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSubmit = async (e: HandleSubmitEvent) => {
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
      } as CreateBikeFormData);

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
    <div className="bg-[#1a1a1a] text-white rounded p-4 flex items-start gap-12 flex-1">
      <div className="flex-1">
        <label className="block mb-1">Create Bike</label>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="brand" className="block mb-1">
              Brand
            </label>
            <select
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
              className="w-full p-2 rounded text-white bg-[#1a1a1a] border border-gray-700"
            >
              <option value="">Select a brand</option>
              {brands.map((b) => (
                <option key={b._id} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="title" className="block mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 rounded text-white bg-transparent border border-gray-700"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="bikeModel" className="block mb-1">
              Bike Model
            </label>
            <input
              id="bikeModel"
              type="text"
              value={bikeModel}
              onChange={(e) => setBikeModel(e.target.value)}
              required
              className="w-full p-2 rounded text-white bg-transparent border border-gray-700"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cc" className="block mb-1">
              CC
            </label>
            <input
              id="cc"
              type="text"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
              required
              className="w-full p-2 rounded text-white bg-transparent border border-gray-700"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="power" className="block mb-1">
              Power
            </label>
            <input
              id="power"
              type="text"
              value={power}
              onChange={(e) => setPower(e.target.value)}
              required
              className="w-full p-2 rounded text-white bg-transparent border border-gray-700"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Upload Image</label>
            <CldUploadWidget
              uploadPreset="idkmyup"
              onSuccess={(result) => {
                if (
                  result.info &&
                  typeof result.info === "object" &&
                  "secure_url" in result.info &&
                  typeof result.info.secure_url === "string"
                ) {
                  setImageUrl(result.info.secure_url);
                }
              }}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open?.()}
                  className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 w-fit"
                >
                  Upload Image
                </button>
              )}
            </CldUploadWidget>
            {imageUrl && (
              <div className="mt-2">
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="max-w-full h-auto"
                  style={{ maxWidth: "200px" }}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#e15617] py-2 rounded hover:bg-[#e15617] disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Bike"}
          </button>
        </form>
      </div>

      <div className="flex-1">
        <label className="block mb-1">Delete Bike</label>
        <div
          className="w-full max-h-[460px] overflow-auto scrollbar-thin scrollbar-thumb-[#e15617] scrollbar-track-[#222] rounded"
          style={{
            scrollbarColor: "#e15617 #222",
            scrollbarWidth: "thin",
          }}
        >
          <label className="block mb-1">Bike title</label>
          {bikes.map((item, index) => (
            <div
              onClick={() => onDeleteBike(item._id)}
              key={index}
              className="border border-gray-700 px-4 py-2 flex items-center w-full justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-14"
                  />
                )}
                <p>{item.title}</p>
              </div>
              <BiTrash />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
