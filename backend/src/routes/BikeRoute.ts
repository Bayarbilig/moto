import express from "express";
import {
  createBike,
  deleteBike,
  getBikeById,
  getBikes,
  updateBike,
} from "../controllers/BikeController";

const bikeRouter = express.Router();

bikeRouter.post("/", createBike);
bikeRouter.get("/", getBikes);
bikeRouter.get("/:id", getBikeById);
bikeRouter.put("/:id", updateBike);
bikeRouter.delete("/:id", deleteBike);

export default bikeRouter;
