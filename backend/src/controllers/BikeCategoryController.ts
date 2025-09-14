import { Request, Response } from "express";
import { BikeCategory } from "../models/BikeCategory";

export const getBikeCategory = async (_req: Request, res: Response) => {
  const data = await BikeCategory.find();
  res.json(data);
};

export const createBikeCategory = async (req: Request, res: Response) => {
  const newBikeCategory = new BikeCategory(req.body);
  await newBikeCategory.save();
  res.status(201).json(newBikeCategory);
};
export const deleteBikeCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  await BikeCategory.findByIdAndDelete(id);
  res.status(204).send();
};
