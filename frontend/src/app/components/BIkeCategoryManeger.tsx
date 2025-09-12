import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";

const BikeCategory = () => {
  const [bikeCategories, setBikeCategories] = useState<
    { _id: string; name: string }[]
  >([]);
  const [createBrandData, setCreateBrandData] = useState({ name: "" });

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/api/bikeCategory");
        setBikeCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  // Input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateBrandData({ ...createBrandData, [e.target.id]: e.target.value });
  };

  // Create new category
  const handleSubmit = async () => {
    if (!createBrandData.name.trim()) return;
    try {
      const res = await api.post("/api/bikeCategory", createBrandData);
      setBikeCategories([...bikeCategories, res.data]);
      setCreateBrandData({ name: "" });
    } catch (err) {
      console.error("Failed to create category", err);
    }
  };

  // Delete category
  const onDeleteBrand = async (id: string) => {
    try {
      await api.delete(`/api/bikeCategory/${id}`);
      setBikeCategories(bikeCategories.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Failed to delete category", err);
    }
  };

  return (
    <div className="bg-[#1a1a1a] text-white rounded-lg p-6 flex flex-col md:flex-row gap-10">
      {/* Create Category Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Шинэ Category үүсгэх</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium">
              Брэндийн нэр
            </label>
            <input
              id="name"
              type="text"
              value={createBrandData.name}
              onChange={handleChange}
              placeholder="Жишээ: Sport bikes"
              className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded transition disabled:opacity-50"
            disabled={!createBrandData.name.trim()}
          >
            Үүсгэх
          </button>
        </div>
      </div>

      {/* Delete Brand Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Брэнд жагсаалт</h2>
        <div className="max-h-[200px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-orange-600 scrollbar-track-[#222] space-y-2">
          {bikeCategories.map((brand) => (
            <div
              key={brand._id}
              onClick={() => {
                if (confirm(`"${brand.name}" брэндийг устгах уу?`)) {
                  onDeleteBrand(brand._id);
                }
              }}
              className="group flex items-center justify-between bg-[#2a2a2a] border border-gray-700 rounded-lg p-3 hover:border-orange-600 transition cursor-pointer"
            >
              <span className="text-sm text-white">{brand.name}</span>
              <BiTrash className="text-red-500 text-lg group-hover:scale-110 transition" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BikeCategory;
