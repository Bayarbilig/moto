import mongoose, { Schema, Document } from "mongoose";

export interface IBike extends Document {
  brand: string;
  title: string;
  bikeModel: string;
  cc: string;
  power: string;
  image: string;
  year: number;
  importedYear: number;
  price: number;
  weight: number;
  description: string;
  sold: boolean;
}

const BikeSchema = new Schema<IBike>(
  {
    brand: { type: String, required: true },
    title: { type: String, required: true },
    bikeModel: { type: String, required: true },
    cc: { type: String, required: true },
    power: { type: String, required: true },
    image: { type: String, required: true },
    year: { type: Number, required: true },
    importedYear: { type: Number, required: true },
    price: { type: Number, required: true },
    weight: { type: Number, required: true },
    description: { type: String, required: true },
    sold: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const BikeModel = mongoose.model<IBike>("Bike", BikeSchema);
export default BikeModel;
