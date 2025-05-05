export const uploadImageToCloud = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  const fileType = file.type; // Check if it's a valid image type
  if (!["image/jpeg", "image/png", "image/gif"].includes(fileType)) {
    throw new Error("Зураг төрлөө зөв сонгоно уу");
  }
  if (!res.ok) throw new Error("Зураг илгээхэд алдаа гарлаа");

  const data = await res.json();
  return data.imageUrl; // Ensure this matches the response from your API handler
};
