import mongoose, { Document, Schema } from "mongoose";

export interface Tool extends Document {
  name: string;
  type: string;
  price: number;
  image: string;
}

const ToolSchema = new Schema<Tool>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<Tool>("Tool", ToolSchema);
