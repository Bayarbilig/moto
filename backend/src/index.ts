import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database/mongoDB";
import dotenv from "dotenv";
import bikeRouter from "./routes/BikeRoute";
import toolRouter from "./routes/ToolRoute";
import router from "./routes/RegistrationRoute";
import userRouter from "./routes/UserRoutes";
import BrandRoute from "./routes/BrandRoute";
import accessRoute from "./routes/AccessoryRoute";
import equipRoute from "./routes/EquipmentRoute";
import eventRouter from "./routes/EventRoute";

dotenv.config();

const app = express();
const port = 5000;

connectToDatabase();

app.use(express.json());
app.use(cors());
app.use("/api/bike", bikeRouter);
app.use("/api/tools", toolRouter);
app.use("/api/register", router);
app.use("/api/users", userRouter);
app.use("/api/brands", BrandRoute);
app.use("/api/accessories", accessRoute);
app.use("/api/equipment", equipRoute);
app.use("/api/event", eventRouter);
app.listen(port, () => {
  console.log(`Сервер ${port} порт дээр ажиллаж байна`);
});
