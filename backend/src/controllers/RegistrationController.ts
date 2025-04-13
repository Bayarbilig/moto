import { Request, Response } from "express";
import RegistrationModel from "../models/RegistrationModel";

export const createRegistration = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const regiter = await RegistrationModel.create(req.body);
    res.status(201).json(regiter);
  } catch (err) {
    res.status(400).json({ error: "Failed to create bike", details: err });
  }
};

export const getRegistrations = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const register = await RegistrationModel.find();
    res.status(200).json(register);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch register", details: err });
  }
};
