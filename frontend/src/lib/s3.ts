import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { readFileSync } from "fs";
import { basename } from "path";

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT, // e.g., "https://<account-id>.r2.cloudflarestorage.com"
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export const uploadToR2 = async (
  filePath: string,
  fileName: string
): Promise<string> => {
  const fileContent = readFileSync(filePath);

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET,
    Key: `avatars/${Date.now()}-${basename(fileName)}`,
    Body: fileContent,
    ContentType: "image/jpeg", // эсвэл `image/png`, автоматаар тодорхойлж болно
  });

  const result = await s3.send(command);
  const url = `${process.env.NEXT_PUBLIC_API_R2_PUB_URL}/${command.input.Key}`;
  return url;
};
