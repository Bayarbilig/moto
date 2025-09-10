import { Schema, model, Document } from "mongoose";

export interface IEquipment extends Document {
  image: string;
  price: string;
  brand: string;
  name: string;
  modelName?: string;
  details: string;
  saled: boolean;
  discount?: string;
}

const equipmentSchema = new Schema<IEquipment>(
  {
    image: { type: String, required: true },
    price: { type: String, required: true },
    brand: { type: String, required: true },
    name: { type: String, required: true },
    modelName: { type: String },
    details: { type: String, required: true },
    discount: { type: String },
    saled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Equipment = model<IEquipment>("Equipment", equipmentSchema);
