import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";

type EquipmentItem = {
  _id: string;
  name: string;
  brand?: string;
  price?: string;
  image?: string;
};

interface EquipmentManagerProps {
  equipment: EquipmentItem[];
  onCreateEquipment: (data: any) => Promise<void>;
  onDeleteEquipment: (id: string) => void;
}

export const EquipmentManager = ({
  equipment,
  onCreateEquipment,
  onDeleteEquipment,
}: EquipmentManagerProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    price: "",
    brand: "",
    name: "",
  });

  interface FormData {
    price: string;
    brand: string;
    name: string;
  }

  interface HandleChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

  const handleChange = (e: HandleChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

  interface CreateEquipmentData extends FormData {
    image: string;
  }

  const handleSubmit = async (e: HandleSubmitEvent) => {
    e.preventDefault();

    try {
      await onCreateEquipment({
        ...formData,
        image: imageUrl,
      } as CreateEquipmentData);

      // Reset form
      setFormData({
        price: "",
        brand: "",
        name: "",
      });
      setImageUrl("");
    } catch (error) {
      console.error("Error creating equipment:", error);
    }
  };

  return (
    <div className="flex flex-1 bg-[#1a1a1a] p-6 gap-12">
      <form
        onSubmit={handleSubmit}
        className="grid gap-2 text-white flex-1 rounded"
      >
        <label className="block mb-1 text-white">Create Equipment</label>

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
              className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700 w-fit text-white"
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
          className="bg-[#e15617] text-white py-1 rounded hover:bg-[#e15617]"
        >
          Create Equipment
        </button>
      </form>

      <div className="flex-1 grid h-fit text-white">
        <label className="mb-1">Delete Equipment</label>
        <div
          className="max-h-[240px] overflow-auto scrollbar-thin scrollbar-thumb-[#e15617] scrollbar-track-[#222] rounded"
          style={{
            scrollbarColor: "#e15617 #222",
            scrollbarWidth: "thin",
          }}
        >
          {equipment.map((item, index) => (
            <div
              onClick={() => onDeleteEquipment(item._id)}
              key={index}
              className="border border-gray-700 px-4 w-full py-2 flex items-center justify-between cursor-pointer"
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
