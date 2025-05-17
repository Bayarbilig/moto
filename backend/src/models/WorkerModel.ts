import { Schema, model, Document } from "mongoose";

export interface IWorker extends Document {
  name: string;
  role?: string;
  createdAt: Date;
  updatedAt: Date;
}

const workerSchema = new Schema<IWorker>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      default: "staff",
    },
  },
  { timestamps: true }
);

const Worker = model<IWorker>("Worker", workerSchema);
export default Worker;
