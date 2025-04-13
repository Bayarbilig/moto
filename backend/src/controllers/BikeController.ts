import { Request, Response } from "express";
import BikeModel from "../models/BikeModel";

// Create
export const createBike = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bike = await BikeModel.create(req.body);
    res.status(201).json(bike);
  } catch (err) {
    res.status(400).json({ error: "Failed to create bike", details: err });
  }
};

// Read all
export const getBikes = async (_req: Request, res: Response): Promise<void> => {
  try {
    const bikes = await BikeModel.find();
    res.status(200).json(bikes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bikes", details: err });
  }
};

// Read one
export const getBikeById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bike = await BikeModel.findById(req.params.id);
    if (!bike) {
      res.status(404).json({ error: "Bike not found" });
      return;
    }
    res.status(200).json(bike);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bike", details: err });
  }
};

// Update
export const updateBike = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bike = await BikeModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bike) {
      res.status(404).json({ error: "Bike not found" });
      return;
    }
    res.status(200).json(bike);
  } catch (err) {
    res.status(400).json({ error: "Failed to update bike", details: err });
  }
};

// Delete
export const deleteBike = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bike = await BikeModel.findByIdAndDelete(req.params.id);
    if (!bike) {
      res.status(404).json({ error: "Bike not found" });
      return;
    }
    res.status(200).json({ message: "Bike deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete bike", details: err });
  }
};
