import { Request, Response } from "express";
import ShowAlert from "../models/ShowAlert";

export const createShowAlert = async (req: Request, res: Response) => {
  try {
    const { alertImage, duration, is_shown } = req.body;

    if (!alertImage || !duration) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const showAlert = new ShowAlert({ alertImage, duration, is_shown });
    await showAlert.save();

    res.status(201).json(showAlert);
  } catch (error) {
    res.status(500).json({ message: "Error creating ShowAlert", error });
  }
};

export const getShowAlerts = async (_req: Request, res: Response) => {
  try {
    const alerts = await ShowAlert.find().sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching alerts", error });
  }
};

export const deleteShowAlert = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const alert = await ShowAlert.findByIdAndDelete(id);

    if (!alert) {
      res.status(404).json({ message: "ShowAlert not found" });
      return;
    }

    res.json({ message: "ShowAlert deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting ShowAlert", error });
  }
};

export const updateShowAlert = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { alertImage, duration, is_shown } = req.body;

    const updatedAlert = await ShowAlert.findByIdAndUpdate(
      id,
      { alertImage, duration, is_shown },
      { new: true, runValidators: true }
    );

    if (!updatedAlert) {
      res.status(404).json({ message: "ShowAlert not found" });
      return;
    }

    res.json(updatedAlert);
  } catch (error) {
    res.status(500).json({ message: "Error updating ShowAlert", error });
  }
};
