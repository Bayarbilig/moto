// ✅ models/BikeModel.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IBike extends Document {
  brand: string;
  title: string;
  bikeModel: string;
  cc: string;
  power: string;
  image: string;
  images: string[];
  price: number;
  status: "available" | "sold" | "reserved";
  mileage: number;
  originCountry: string;
  fuelType: "gasoline" | "diesel" | "electric" | "hybrid";
  soldDate?: Date;
  views: number;
  likes: number;
}

const BikeSchema = new Schema<IBike>(
  {
    brand: { type: String, required: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    bikeModel: { type: String, required: true, trim: true },
    cc: { type: String, required: true, trim: true },
    power: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    images: [{ type: String }],
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["available", "sold", "reserved"],
      default: "available",
    },
    mileage: { type: Number, default: 0 },
    originCountry: { type: String, trim: true },
    fuelType: {
      type: String,
      enum: ["gasoline", "diesel", "electric", "hybrid"],
      default: "gasoline",
    },
    soldDate: { type: Date },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Bike ||
  mongoose.model<IBike>("Bike", BikeSchema);
