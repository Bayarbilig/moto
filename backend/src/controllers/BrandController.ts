import { Request, Response } from "express";
import { Brand } from "../models/BrandModel";

export const getBrands = async (_req: Request, res: Response) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const createBrand = async (req: Request, res: Response) => {
  const { name, slug } = req.body;
  try {
    const existing = await Brand.findOne({ slug });
    if (existing) {
      res.status(400).json({ message: "Brand already exists" });
      return;
    }

    const brand = new Brand({ name, slug });
    await brand.save();
    res.status(201).json(brand);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteBrand = async (req: Request, res: Response) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
      res.status(404).json({ message: "Brand not found" });
      return;
    }

    res.json({ message: "Brand deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
