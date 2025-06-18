// routes/BikeRoute.ts
import { Router } from "express";
import {
  createBikes,
  getAllBikes,
  getBikeById,
  getBikesByBrand,
  updateBike,
  deleteBikeById,
} from "../controllers/BikeController";

const router = Router();

// 👉 энд "/bikes" биш шууд root path ашиглана. Учир нь index.ts дээр app.use("/api/bikes", router) гэж байгаа.
router.post("/bikes", createBikes);
router.get("/bikes", getAllBikes);
router.get("/brand/:brand", getBikesByBrand);
router.get("/bikes/:id", getBikeById);
router.put("/bikes/:id", updateBike);
router.delete("/bikes/:id", deleteBikeById);

export default router;
