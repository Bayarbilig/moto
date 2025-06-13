import { Request, Response } from "express";
import BikeModel from "../models/BikeModel";

export const createBikes = async (req: Request, res: Response) => {
  try {
    const bikes = req.body.map((bike: any) => ({
      ...bike,
      sold: bike.sold ?? false,
    }));
    const created = await BikeModel.insertMany(bikes);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: "Error creating bikes", error });
  }
};

// Бүх мотоцикл авах
export const getAllBikes = async (_req: Request, res: Response) => {
  try {
    const bikes = await BikeModel.find();
    res.status(200).json(bikes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all bikes", error });
  }
};

// Брэндээр шүүж авах
export const getBikesByBrand = async (req: Request, res: Response) => {
  try {
    const { brand } = req.params;
    const bikes = await BikeModel.find({
      brand: new RegExp(`^${brand}$`, "i"),
    });
    res.status(200).json(bikes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bikes", error });
  }
};

// ID-р устгах
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

// ID-р шинэчлэх

// Зарагдсан мотоцикл авах
export const getSoldBikes = async (_req: Request, res: Response) => {
  try {
    const bikes = await BikeModel.find({ sold: true });
    res.status(200).json(bikes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sold bikes", error });
  }
};

// Зарлагдаагүй мотоцикл авах
export const getAvailableBikes = async (_req: Request, res: Response) => {
  try {
    const bikes = await BikeModel.find({ sold: false });
    res.status(200).json(bikes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching available bikes", error });
  }
};
