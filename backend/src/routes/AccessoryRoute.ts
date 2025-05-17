import express from "express";
import {
  getAccessories,
  createAccessory,
  deleteAccessory,
} from "../controllers/AccessoryController";

const accessRoute = express.Router();

accessRoute.get("/", getAccessories);
accessRoute.post("/", createAccessory);
accessRoute.delete("/:id", deleteAccessory);

export default accessRoute;
