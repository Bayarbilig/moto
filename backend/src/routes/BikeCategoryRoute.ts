import { createBikeCategory, getBikeCategory } from "../controllers/BikeCategoryController"
import express from "express"
const bikeCategoryRoute = express.Router()

bikeCategoryRoute.get("/",getBikeCategory)
bikeCategoryRoute.post("/",createBikeCategory)

export default bikeCategoryRoute