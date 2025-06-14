import { Router } from "express";
import {
  createBikes,
  getAllBikes,
  getBikesByBrand,
  deleteBikeById,
  getSoldBikes,
  getAvailableBikes,
} from "../controllers/BikeController";

const bikeRouter = Router();
bikeRouter.post("/bikes", createBikes);
bikeRouter.get("/bikes", getAllBikes);
bikeRouter.get("/bikes/brand/:brand", getBikesByBrand);
bikeRouter.delete("/bikes/:id", deleteBikeById);
bikeRouter.get("/bikes/sold", getSoldBikes);
bikeRouter.get("/bikes/available", getAvailableBikes);

export default bikeRouter;
