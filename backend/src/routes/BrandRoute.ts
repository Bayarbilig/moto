import { Router } from "express";
import {
  createBrand,
  deleteBrand,
  getBrands,
} from "../controllers/BrandController";

const BrandRoute = Router();

BrandRoute.get("/", getBrands);
BrandRoute.post("/", createBrand);
BrandRoute.delete("/:id", deleteBrand);

export default BrandRoute;
