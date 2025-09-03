import mongoose, { Document, Schema } from "mongoose";

export interface IShowAlert extends Document {
  alertImage: string;
  duration: number;
  is_shown: boolean;
}

const ShowAlertSchema: Schema = new Schema({
  alertImage: { type: String, required: true },
  duration: { type: Number, required: true },
  is_shown: { type: Boolean, required: true },
});

export default mongoose.model<IShowAlert>("ShowAlert", ShowAlertSchema);
