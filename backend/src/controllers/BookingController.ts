import { Request, Response } from "express";
import Worker from "../models/WorkerModel";
import Booking from "../models/BookingModel";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { workerId, customerName, date } = req.body;

    const worker = await Worker.findById(workerId);
    if (!worker) {
      res.status(404).json({ message: "Worker not found" });
      return;
    }

    // Check for double booking
    const existing = await Booking.findOne({ worker: workerId, date });
    if (existing) {
      res.status(400).json({ message: "Time already booked" });
      return;
    }

    const booking = await Booking.create({
      worker: workerId,
      customerName,
      date,
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Booking failed", error });
  }
};

export const getWorkerBookings = async (req: Request, res: Response) => {
  try {
    const { workerId } = req.params;
    const bookings = await Booking.find({ worker: workerId }).sort({ date: 1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch bookings", error });
  }
};
export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;

    const deleted = await Booking.findByIdAndDelete(bookingId);
    if (!deleted) {
      res.status(404).json({ message: "Захиалга олдсонгүй" });
      return;
    }

    res
      .status(200)
      .json({ message: "Захиалгыг амжилттай устгалаа", booking: deleted });
  } catch (error) {
    res.status(500).json({ message: "Устгах үед алдаа гарлаа", error });
    return;
  }
};
