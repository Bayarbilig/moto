import express from "express";
import {
  getAllServices,
  createService,
  updateService,
  deleteService,
} from "../controllers/ServiceController";

const serviceRouter = express.Router();

serviceRouter.route("/").get(getAllServices).post(createService);

serviceRouter.route("/:id").put(updateService).delete(deleteService);

export default serviceRouter;
