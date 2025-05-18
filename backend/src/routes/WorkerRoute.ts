import { Router } from "express";
import { createWorker, getWorkers } from "../controllers/WorkerController";

const workerRoute = Router();

workerRoute.post("/", createWorker); // POST /api/workers
workerRoute.get("/", getWorkers); // GET /api/workers

export default workerRoute;
