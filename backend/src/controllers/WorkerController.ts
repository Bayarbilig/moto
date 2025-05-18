import { Request, Response } from "express";
import Worker from "../models/WorkerModel";

export const createWorker = async (req: Request, res: Response) => {
  try {
    const { name, role } = req.body;

    if (!name) {
      res.status(400).json({ message: "Name is required" });
      return;
    }

    const newWorker = await Worker.create({ name, role });
    res.status(201).json(newWorker);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    return;
  }
};

export const getWorkers = async (_req: Request, res: Response) => {
  try {
    const workers = await Worker.find();
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    return;
  }
};
