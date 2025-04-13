import mongoose, { Document, Schema } from "mongoose";

export interface Bike extends Document {
  brand: string;
  title: string;
  modelName: string; // renamed from "modelName" to avoid conflict
  cc: string;
  power: string;
  image: string;
}

const BikeSchema = new Schema<Bike>(
  {
    brand: { type: String, required: true },
    title: { type: String, required: true },
    modelName: { type: String, required: true }, // updated field
    cc: { type: String, required: true },
    power: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<Bike>("Bike", BikeSchema);
