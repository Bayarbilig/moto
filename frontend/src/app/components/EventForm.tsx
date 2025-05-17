import React, { useState } from "react";
import { Event } from "./Types";
import { CldUploadWidget } from "next-cloudinary";

interface Props {
  onCreate: (event: Event) => void;
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

const EventForm: React.FC<Props> = ({ onCreate }) => {
  const [form, setForm] = useState<Event>(defaultEvent);
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      className=" rounded-xl shadow mb-6 grid gap-3 w-[500px] text-white"
    >
      <input
        className="border p-2 rounded border-gray-700 bg-transparent"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Гарчиг"
        required
      />

      <div>
        <CldUploadWidget
          uploadPreset="idkmyup"
          onSuccess={(result: any) => {
            if (
              result.info &&
              typeof result.info === "object" &&
              "secure_url" in result.info &&
              typeof result.info.secure_url === "string"
            ) {
              const url = result.info.secure_url;
              setImageUrl(url);
              setForm((prev) => ({ ...prev, image: url }));
            }
          }}
        >
          {({ open }: { open?: () => void }) => (
            <button
              type="button"
              onClick={() => open && open()}
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
              className="max-w-full h-auto rounded shadow"
              style={{ maxWidth: "200px" }}
            />
          </div>
        )}
      </div>
      <input
        className="border p-2 rounded border-gray-700 bg-transparent"
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Төрөл"
        required
      />
      <textarea
        className="border p-2 rounded border-gray-700 bg-transparent"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Тайлбар"
        required
      />
      <input
        className="border p-2 rounded border-gray-700 bg-transparent"
        name="date"
        value={form.date}
        onChange={handleChange}
        placeholder="Огноо (2025-06-15)"
        required
      />
      <input
        className="border p-2 rounded border-gray-700 bg-transparent"
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Байршил"
        required
      />

      <button
        className="bg-[#e15617] text-white py-1 rounded hover:bg-[#e15617] disabled:opacity-50"
        disabled={!imageUrl}
      >
        Үүсгэх
      </button>
    </form>
  );
};

export default EventForm;
