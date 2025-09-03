import React, { useState } from "react";
import { Event } from "./Types";
import { CldUploadWidget } from "next-cloudinary";

interface Props {
  onCreate: (event: Event) => void;
  loading?: boolean;
}

const defaultEvent: Event = {
  image: "",
  category: "",
  title: "",
  description: "",
  date: "",
  location: "",
  viewButtonText: "Тэмцээн харах",
  applyButtonText: "Apply хийх",
};

const EventForm: React.FC<Props> = ({ onCreate, loading = false }) => {
  const [form, setForm] = useState<Event>(defaultEvent);
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const eventWithImage = {
      ...form,
      image: imageUrl,
    };

    onCreate(eventWithImage);
    setForm(defaultEvent);
    setImageUrl("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-md text-white"
    >
      <div>
        <label htmlFor="title" className="block mb-1 font-medium">
          Гарчиг
        </label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Гарчиг"
          required
          className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label htmlFor="category" className="block mb-1 font-medium">
          Төрөл
        </label>
        <input
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Төрөл"
          required
          className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block mb-1 font-medium">
          Тайлбар
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Тайлбар"
          required
          className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
        />
      </div>

      <div>
        <label htmlFor="date" className="block mb-1 font-medium">
          Огноо
        </label>
        <input
          id="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          placeholder="Огноо оруулна уу"
          required
          className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label htmlFor="location" className="block mb-1 font-medium">
          Байршил
        </label>
        <input
          id="location"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Байршил"
          required
          className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Upload Image */}
      <div>
        <label className="block mb-2 font-medium"> Upload Image</label>
        <CldUploadWidget
          uploadPreset="idkmyup"
          onSuccess={(result) => {
            const url = (result.info as any)?.secure_url;
            if (typeof url === "string") {
              setImageUrl(url);
              setForm((prev) => ({ ...prev, image: url }));
            }
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
        disabled={loading || !imageUrl}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded transition disabled:opacity-50"
      >
        {loading ? "Үүсгэж байна..." : "Үүсгэх"}
      </button>
    </form>
  );
};

export default EventForm;
