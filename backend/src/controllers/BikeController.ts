import { Request, Response } from "express";
import BikeModel from "../models/BikeModel";

export const createBikes = async (req: Request, res: Response) => {
  try {
    const bikes = req.body;
    const created = await BikeModel.insertMany(bikes);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: "Error creating bikes", error });
  }
};

export const getBikesByBrand = async (req: Request, res: Response) => {
  try {
    const { brand } = req.params;
    const bikes = await BikeModel.find({ brand: brand.toLowerCase() });
    res.status(200).json(bikes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bikes", error });
  }
};

export const getAllBikes = async (_req: Request, res: Response) => {
  try {
    const bikes = await BikeModel.find();
    res.status(200).json(bikes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all bikes", error });
  }
};
export const deleteBikeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await BikeModel.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ message: "Bike not found" });
      return;
    }

    res.status(200).json({ message: "Bike deleted successfully", deleted });
  } catch (error) {
    res.status(500).json({ message: "Error deleting bike", error });
  }
};
