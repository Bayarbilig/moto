import { Schema, model, Document } from "mongoose";

export interface IAccessory extends Document {
  image: string;
  price: string;
  brand: string;
  name: string;
  modelName?: string;
  details: string;
  discount?: string;
  saled: boolean;
}

const accessorySchema = new Schema<IAccessory>(
  {
    image: { type: String, required: true },
    price: { type: String, required: true },
    brand: { type: String, required: true },
    name: { type: String, required: true },
    details: { type: String, required: true },
    modelName: { type: String },
    discount: { type: String },
    saled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Accessory = model<IAccessory>("Accessory", accessorySchema);
