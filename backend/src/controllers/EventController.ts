import { Request, Response } from "express";
import { EventModel } from "../models/EventModel";

// Create Event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = new EventModel(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Event үүсгэхэд алдаа гарлаа", error });
  }
};

// Get All Events
export const getEvents = async (_req: Request, res: Response) => {
  try {
    const events = await EventModel.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Events авахад алдаа гарлаа", error });
  }
};

// Delete Event by ID
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await EventModel.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ message: "Event олдсонгүй" });
      return;
    }
    res.status(200).json({ message: "Event устгагдлаа" });
  } catch (error) {
    res.status(500).json({ message: "Event устгахад алдаа гарлаа", error });
  }
};
// Get Single Event by ID
export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await EventModel.findById(id);
    if (!event) {
      res.status(404).json({ message: "Event олдсонгүй" });
      return;
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Event авахад алдаа гарлаа", error });
  }
};
