import express from "express";
import {
  getAccessories,
  createAccessory,
  deleteAccessory,
  updateAccessory,
  getAccessoryById,
} from "../controllers/AccessoryController";

const accessRoute = express.Router();

accessRoute.get("/", getAccessories);
accessRoute.get("/:id", getAccessoryById);
accessRoute.post("/", createAccessory);
accessRoute.delete("/:id", deleteAccessory);
accessRoute.put("/:id", updateAccessory);


export default accessRoute;
