import { Request, Response } from "express";
import { Accessory } from "../models/AccessoryModel";

export const getAccessories = async (_req: Request, res: Response) => {
  const data = await Accessory.find();
  res.json(data);
};

export const getAccessoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const accessory = await Accessory.findById(id);
    if (!accessory) {
      res.status(404).json({ message: "Accessory not found" });
      return;
    }
    res.json(accessory);
  } catch (error) {
    res.status(500).json({ message: "Error fetching accessory", error });
  }
};

export const createAccessory = async (req: Request, res: Response) => {
  const newAccessory = new Accessory(req.body);
  await newAccessory.save();
  res.status(201).json(newAccessory);
};

export const updateAccessory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updated = await Accessory.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      res.status(404).json({ message: "Accessory not found" });
      return;
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating accessory", error });
  }
};

export const deleteAccessory = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Accessory.findByIdAndDelete(id);
  res.status(204).send();
};
