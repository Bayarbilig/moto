import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  image: string;
  category: string;
  title: string;
  description: string;
  date: string;
  location: string;
  viewButtonText: string;
  applyButtonText: string;
}

const EventSchema: Schema = new Schema<IEvent>(
  {
    image: { type: String, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    viewButtonText: { type: String, required: true },
    applyButtonText: { type: String, required: true },
  },
  { timestamps: true }
);

export const EventModel = mongoose.model<IEvent>("Event", EventSchema);
