import mongoose, { Document, Schema } from "mongoose";
import { IService } from "./ServiceModel";

export interface IMotoService extends Document {
  name: string;
  phone: string;
  email: string;
  motoModel: string;
  motoYear: string;
  date: Date;
  time: string;
  services: mongoose.Types.ObjectId[] | IService[];
  notes?: string;
  totalPrice?: number;
  createdAt: Date;
}

const MotoServiceSchema: Schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  motoModel: { type: String, required: true },
  motoYear: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
  notes: { type: String },
  totalPrice: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IMotoService>("MotoService", MotoServiceSchema);
