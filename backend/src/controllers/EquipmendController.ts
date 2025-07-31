import { Request, Response } from "express";
import { Equipment } from "../models/EquipModel";

export const getEquipments = async (_req: Request, res: Response) => {
  const data = await Equipment.find();
  res.json(data);
};

export const createEquipment = async (req: Request, res: Response) => {
  const newEquipment = new Equipment(req.body);
  await newEquipment.save();
  res.status(201).json(newEquipment);
};

export const deleteEquipment = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Equipment.findByIdAndDelete(id);
  res.status(204).send();
};
export const updateEquipment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Equipment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      res.status(404).json({ message: "Equipment not found" });
      return;
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating equipment", error });
  }
};
export const getEquipmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const equipment = await Equipment.findById(id);

    if (!equipment) {
      res.status(404).json({ message: "Equipment not found" });
      return;
    }

    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching equipment", error });
  }
};
