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
