import formidable, { Fields, Files } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { uploadToR2 } from "@/lib/s3"; // эсвэл S3

// API тохиргоо
export const config = {
  api: {
    bodyParser: false, // Formidable ашиглахад body-parser-ийг хааж байна
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = new formidable.IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields: Fields<string>, files: Files) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ error: "Upload failed" });
    }

    // Файл шалгах
    const uploadedFile = files.file
      ? Array.isArray(files.file)
        ? files.file[0]
        : files.file
      : null;

    if (!uploadedFile) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    try {
      // Cloudflare R2 эсвэл S3 рүү файл илгээх
      const data = await uploadToR2(
        uploadedFile.filepath,
        uploadedFile.originalFilename || "upload.png"
      );

      res.status(200).json({ url: data });
    } catch (uploadError) {
      console.error("Upload to R2/S3 failed:", uploadError);
      return res.status(500).json({ error: "Upload failed" });
    }
  });
}
