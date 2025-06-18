// ✅ controllers/BikeController.ts
import { Request, Response } from "express";
import BikeModel from "../models/BikeModel";

// 🟢 Create multiple bikes
export const createBikes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bikes = req.body;

    if (!Array.isArray(bikes) || bikes.length === 0) {
      res.status(400).json({ message: "Invalid bike data" });
      return;
    }

    const createdBikes = await BikeModel.insertMany(bikes);
    res
      .status(201)
      .json({ message: "Bikes created successfully", data: createdBikes });
  } catch (error) {
    console.error("Create Bikes Error:", error);
    res
      .status(500)
      .json({ message: "Server error while creating bikes", error });
  }
};

// 🟢 Get all bikes with filtering, pagination, and sorting
export const getAllBikes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      brand,
      minPrice,
      maxPrice,
      sortBy,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const query: any = {};

    if (brand) query.brand = brand;
    if (search) query.title = { $regex: search, $options: "i" };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const sortOptions: any = {};
    if (sortBy === "price_asc") sortOptions.price = 1;
    if (sortBy === "price_desc") sortOptions.price = -1;
    if (sortBy === "latest") sortOptions.createdAt = -1;

    const bikes = await BikeModel.find(query)
      .sort(sortOptions)
      .skip((+page - 1) * +limit)
      .limit(+limit);

    const total = await BikeModel.countDocuments(query);

    res.status(200).json({ data: bikes, total });
  } catch (error) {
    console.error("Get All Bikes Error:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching bikes", error });
  }
};

// 🟢 Get bikes by brand
export const getBikesByBrand = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { brand } = req.params;
    const bikes = await BikeModel.find({ brand: brand.toLowerCase() });

    if (!bikes.length) {
      res.status(404).json({ message: "No bikes found for this brand" });
      return;
    }

    res.status(200).json({ message: "Bikes fetched by brand", data: bikes });
  } catch (error) {
    console.error("Get Bikes By Brand Error:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching brand bikes", error });
  }
};

// 🟢 Get single bike by ID
export const getBikeById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const bike = await BikeModel.findById(id);

    if (!bike) {
      res.status(404).json({ message: "Bike not found" });
      return;
    }

    res.status(200).json({ data: bike });
  } catch (error) {
    console.error("Get Bike By ID Error:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching bike", error });
  }
};

// 🟢 Update bike by ID
export const updateBike = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedBike = await BikeModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedBike) {
      res.status(404).json({ message: "Bike not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Bike updated successfully", data: updatedBike });
  } catch (error) {
    console.error("Update Bike Error:", error);
    res
      .status(500)
      .json({ message: "Server error while updating bike", error });
  }
};

// 🟢 Delete bike by ID
export const deleteBikeById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedBike = await BikeModel.findByIdAndDelete(id);

    if (!deletedBike) {
      res.status(404).json({ message: "Bike not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Bike deleted successfully", data: deletedBike });
  } catch (error) {
    console.error("Delete Bike Error:", error);
    res
      .status(500)
      .json({ message: "Server error while deleting bike", error });
  }
};
