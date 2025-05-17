import mongoose, { Schema, Document } from "mongoose";

export interface IBike extends Document {
  brand: string;
  title: string;
  bikeModel: string;
  cc: string;
  power: string;
  image: string;
}

const BikeSchema = new Schema<IBike>(
  {
    brand: { type: String, required: true },
    title: { type: String, required: true },
    bikeModel: { type: String, required: true },
    cc: { type: String, required: true },
    power: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Bike ||
  mongoose.model<IBike>("Bike", BikeSchema);
