import { Request, Response } from "express";
import ServiceModel from "../models/ServiceModel";

export const getAllServices = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const services = await ServiceModel.find();
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const createService = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, price } = req.body;
    const service = await ServiceModel.create({ name, price });
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const updateService = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const service = await ServiceModel.findByIdAndUpdate(
      id,
      { name, price },
      { new: true, runValidators: true }
    );

    if (!service) {
      res.status(404).json({ success: false, error: "Service not found" });
      return;
    }

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const deleteService = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const service = await ServiceModel.findByIdAndDelete(id);

    if (!service) {
      res.status(404).json({ success: false, error: "Service not found" });
      return;
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        error: error instanceof Error ? error.message : String(error),
      });
  }
};
