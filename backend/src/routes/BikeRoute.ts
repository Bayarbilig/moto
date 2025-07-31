import { Router } from "express";
import {
  createBikes,
  getBikesByBrand,
  getAllBikes,
  deleteBikeById,
  getBikeById,
  updateBikeById,
} from "../controllers/BikeController";

const bikeRouter = Router();

bikeRouter.post("/bikes", createBikes);
bikeRouter.get("/bikes", getAllBikes);
bikeRouter.get("/bikes/:id", getBikeById);
bikeRouter.get("/bikes/:brand", getBikesByBrand);
bikeRouter.delete("/bikes/:id", deleteBikeById);
bikeRouter.put("/bikes/:id",updateBikeById)

export default bikeRouter;
