// routes/showAlert.routes.ts
import { Router } from "express";
import {
  createShowAlert,
  deleteShowAlert,
  getShowAlerts,
  updateShowAlert,
} from "../controllers/ShowAlertController";

const showAlertRoute = Router();

showAlertRoute.post("/", createShowAlert);
showAlertRoute.get("/", getShowAlerts);
showAlertRoute.delete("/:id", deleteShowAlert);
showAlertRoute.put("/:id", updateShowAlert);

export default showAlertRoute;
