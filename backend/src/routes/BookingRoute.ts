import { Router } from "express";
import {
  createBooking,
  deleteBooking,
  getWorkerBookings,
} from "../controllers/BookingController";

const bookingRouter = Router();

bookingRouter.post("/", createBooking); // POST /api/bookings
bookingRouter.get("/:workerId", getWorkerBookings); // GET /api/bookings/:workerId
bookingRouter.delete("/:bookingId", deleteBooking); // GET /api/bookings/:workerId

export default bookingRouter;
