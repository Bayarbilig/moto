import { Schema, model, Document } from "mongoose";

export interface IBrand extends Document {
  name: string;
  slug: string;
}

const brandSchema = new Schema<IBrand>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const Brand = model<IBrand>("Brand", brandSchema);
