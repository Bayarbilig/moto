import express from "express";
import {
  getEquipments,
  createEquipment,
  deleteEquipment,
  updateEquipment,
  getEquipmentById,
} from "../controllers/EquipmendController";

const equipRoute = express.Router();

equipRoute.get("/", getEquipments);
equipRoute.post("/", createEquipment);
equipRoute.delete("/:id", deleteEquipment);
equipRoute.put("/:id", updateEquipment);
equipRoute.get("/:id", getEquipmentById);

export default equipRoute;
