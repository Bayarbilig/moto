import { Schema, model, Document } from "mongoose";

export interface IBooking extends Document {
  worker: Schema.Types.ObjectId;
  customerName: string;
  date: Date;
}

const bookingSchema = new Schema<IBooking>({
  worker: { type: Schema.Types.ObjectId, ref: "Worker", required: true },
  customerName: { type: String, required: true },
  date: { type: Date, required: true },
});

const Booking = model<IBooking>("Booking", bookingSchema);
export default Booking;
