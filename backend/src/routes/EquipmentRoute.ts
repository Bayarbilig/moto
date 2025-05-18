import express from "express";
import {
  getEquipments,
  createEquipment,
  deleteEquipment,
} from "../controllers/EquipmendController";

const equipRoute = express.Router();

equipRoute.get("/", getEquipments);
equipRoute.post("/", createEquipment);
equipRoute.delete("/:id", deleteEquipment);

export default equipRoute;
