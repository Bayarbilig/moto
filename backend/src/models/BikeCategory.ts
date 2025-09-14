import { Document, model, Schema } from "mongoose";

export interface IBikeCategory extends Document {
  name: string;
}

const bikeCategorySchema = new Schema<IBikeCategory>({
  name: { type: String, required: true },
});

export const BikeCategory = model<IBikeCategory>(
  "BikeCategory",
  bikeCategorySchema
);
