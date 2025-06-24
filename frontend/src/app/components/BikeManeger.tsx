// "use client";

// import { useState } from "react";
// import { CldUploadWidget } from "next-cloudinary";
// import { BiTrash } from "react-icons/bi";
// import { Bike, Brand } from "./Types";

// interface BikeManagerProps {
//   brands: Brand[];
//   bikes: Bike[];
//   onCreateBike: (bike: Partial<Bike>) => Promise<void>;
//   onDeleteBike: (id: string) => void;
//   onUpdateBike: (id: string, data: Partial<Bike>) => Promise<void>;
// }

// const InputField = ({
//   id,
//   label,
//   value,
//   onChange,
//   type = "text",
//   required = false,
//   className = "",
// }: {
//   id: string;
//   label: string;
//   value: string;
//   onChange: (val: string) => void;
//   type?: string;
//   required?: boolean;
//   className?: string;
// }) => (
//   <div className={`space-y-1 ${className}`}>
//     <label htmlFor={id} className="text-sm font-medium block">
//       {label}
//     </label>
//     <input
//       id={id}
//       type={type}
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       required={required}
//       className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
//     />
//   </div>
// );

// export const BikeManager = ({
//   brands,
//   bikes,
//   onCreateBike,
//   onDeleteBike,
// }: BikeManagerProps) => {
//   const [form, setForm] = useState({
//     brand: "",
//     title: "",
//     bikeModel: "",
//     cc: "",
//     power: "",
//     image: "",
//     images: "",
//     description: "",
//     variants: "",
//     year: "",
//     price: "",
//     stock: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (key: string, value: string) =>
//     setForm((prev) => ({ ...prev, [key]: value }));

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const selectedBrand = brands.find((b) => b._id === form.brand);
//       await onCreateBike({
//         ...form,
//         brand: selectedBrand || undefined,
//         images: form.images
//           .split(",")
//           .map((url) => url.trim())
//           .filter(Boolean),
//         variants: form.variants
//           .split(",")
//           .map((v) => v.trim())
//           .filter(Boolean),
//         year: form.year ? +form.year : undefined,
//         price: form.price ? +form.price : undefined,
//         stock: form.stock ? +form.stock : undefined,
//       });
//       setForm({
//         brand: "",
//         title: "",
//         bikeModel: "",
//         cc: "",
//         power: "",
//         image: "",
//         images: "",
//         description: "",
//         variants: "",
//         year: "",
//         price: "",
//         stock: "",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-[#1a1a1a] text-white rounded-lg p-6 flex flex-col md:flex-row gap-10 w-full">
//       {/* Create Bike Section */}
//       <div className="w-full md:w-1/2">
//         <h2 className="text-xl font-semibold mb-4">Create Bike</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Brand Select */}
//           <div>
//             <label className="text-sm font-medium block mb-1">Брэнд</label>
//             <select
//               value={form.brand}
//               onChange={(e) => handleChange("brand", e.target.value)}
//               required
//               className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
//             >
//               <option value="">Брэнд сонгох</option>
//               {brands.map((b) => (
//                 <option key={b._id} value={b._id}>
//                   {b.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <InputField
//             id="title"
//             label="Гарчиг *"
//             value={form.title}
//             onChange={(v) => handleChange("title", v)}
//             required
//           />
//           <InputField
//             id="bikeModel"
//             label="Загвар *"
//             value={form.bikeModel}
//             onChange={(v) => handleChange("bikeModel", v)}
//             required
//           />
//           <InputField
//             id="cc"
//             label="CC *"
//             value={form.cc}
//             onChange={(v) => handleChange("cc", v)}
//             required
//           />
//           <InputField
//             id="power"
//             label="Хүч *"
//             value={form.power}
//             onChange={(v) => handleChange("power", v)}
//             required
//           />
//           <InputField
//             id="year"
//             label="Үйлдвэрлэсэн он"
//             type="number"
//             value={form.year}
//             onChange={(v) => handleChange("year", v)}
//           />
//           <InputField
//             id="price"
//             label="Үнэ"
//             type="number"
//             value={form.price}
//             onChange={(v) => handleChange("price", v)}
//           />
//           <InputField
//             id="stock"
//             label="Нөөц"
//             type="number"
//             value={form.stock}
//             onChange={(v) => handleChange("stock", v)}
//           />
//           <InputField
//             id="variants"
//             label="Хувилбарууд (коммагаар)"
//             value={form.variants}
//             onChange={(v) => handleChange("variants", v)}
//           />
//           <InputField
//             id="images"
//             label="Нэмэлт зурагнууд (коммагаар)"
//             value={form.images}
//             onChange={(v) => handleChange("images", v)}
//           />

//           <div className="space-y-2">
//             <label className="text-sm font-medium block">Гол зураг</label>
//             <CldUploadWidget
//               uploadPreset="idkmyup"
//               onSuccess={(result) => {
//                 const secureUrl = (result.info as { secure_url?: string })
//                   ?.secure_url;
//                 if (secureUrl) handleChange("image", secureUrl);
//               }}
//             >
//               {({ open }) => (
//                 <button
//                   type="button"
//                   onClick={() => open?.()}
//                   className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
//                 >
//                   Upload Image
//                 </button>
//               )}
//             </CldUploadWidget>
//             {form.image && (
//               <img
//                 src={form.image}
//                 alt="Uploaded"
//                 className="mt-3 w-40 h-40 object-cover rounded border border-gray-700"
//               />
//             )}
//           </div>

//           <div>
//             <label
//               htmlFor="description"
//               className="text-sm font-medium block mb-1"
//             >
//               Тайлбар
//             </label>
//             <textarea
//               id="description"
//               value={form.description}
//               onChange={(e) => handleChange("description", e.target.value)}
//               rows={4}
//               className="w-full p-3 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-orange-600 hover:bg-orange-700 py-2 rounded text-white font-semibold disabled:opacity-50"
//           >
//             {loading ? "Нэмэгдэж байна..." : "Мотоцикл нэмэх"}
//           </button>
//         </form>
//       </div>

//       {/* Show Created Bikes */}
//       <div className="w-full md:w-1/2">
//         <h2 className="text-xl font-semibold mb-4">Created Bikes</h2>
//         <div className="max-h-[520px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-orange-600 scrollbar-track-[#222]">
//           {bikes.map((bike) => (
//             <div
//               key={bike._id}
//               onClick={() => {
//                 if (confirm(`Delete "${bike.title}"?`)) onDeleteBike(bike._id);
//               }}
//               className="group border border-gray-700 rounded-lg overflow-hidden bg-[#2a2a2a] hover:border-orange-600 transition cursor-pointer flex items-center gap-4 p-4"
//             >
//               <img
//                 src={bike.image}
//                 alt={bike.title}
//                 className="w-32 h-32 object-cover rounded border border-gray-600"
//               />
//               <div className="flex-1 text-sm space-y-1">
//                 <p className="font-semibold text-white">{bike.title}</p>
//                 <p className="text-gray-400">Model: {bike.bikeModel}</p>
//                 <p className="text-[#e15617]">
//                   {bike.price?.toLocaleString() ?? "?"} ₮
//                 </p>
//               </div>
//               <BiTrash className="text-red-500 text-xl hover:scale-110 transition" />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
