import { Request, Response } from "express";
import { Accessory } from "../models/AccessoryModel";

export const getAccessories = async (_req: Request, res: Response) => {
  const data = await Accessory.find();
  res.json(data);
};

export const createAccessory = async (req: Request, res: Response) => {
  const newAccessory = new Accessory(req.body);
  await newAccessory.save();
  res.status(201).json(newAccessory);
};

export const deleteAccessory = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Accessory.findByIdAndDelete(id);
  res.status(204).send();
};
