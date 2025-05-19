import express from "express";
import {
  createMotoServiceBooking,
  getMotoServiceBookings,
  getMotoServiceBookingById,
  updateMotoServiceBooking,
  deleteMotoServiceBooking,
} from "../controllers/MotoServiceController";

const motoServiceRouter = express.Router();

motoServiceRouter
  .route("/")
  .get(getMotoServiceBookings)
  .post(createMotoServiceBooking);

motoServiceRouter
  .route("/:id")
  .get(getMotoServiceBookingById)
  .put(updateMotoServiceBooking)
  .delete(deleteMotoServiceBooking);

export default motoServiceRouter;
