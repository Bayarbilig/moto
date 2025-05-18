import { Router } from "express";
import {
  createBikes,
  getBikesByBrand,
  getAllBikes,
  deleteBikeById,
} from "../controllers/BikeController";

const bikeRouter = Router();

bikeRouter.post("/bikes", createBikes);
bikeRouter.get("/bikes", getAllBikes);
bikeRouter.get("/bikes/:brand", getBikesByBrand);
bikeRouter.delete("/bikes/:id", deleteBikeById);

export default bikeRouter;
