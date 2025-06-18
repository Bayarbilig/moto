  // index.ts
  import express from "express";
  import cors from "cors";
  import dotenv from "dotenv";
  import { connectToDatabase } from "./database/mongoDB";

  // Route imports
  import bikeRouter from "./routes/BikeRoute";
  import toolRouter from "./routes/ToolRoute";
  import registerRouter from "./routes/RegistrationRoute";
  import userRouter from "./routes/UserRoutes";
  import brandRouter from "./routes/BrandRoute";
  import accessoryRouter from "./routes/AccessoryRoute";
  import equipmentRouter from "./routes/EquipmentRoute";
  import eventRouter from "./routes/EventRoute";
  import workerRouter from "./routes/WorkerRoute";
  import bookingRouter from "./routes/BookingRoute";
  import serviceRouter from "./routes/ServiceRoute";
  import motoServiceRouter from "./routes/MotoServiceRoute";

  dotenv.config();

  const app = express();
  const PORT = process.env.PORT || 5000;

  // DB connect
  connectToDatabase();

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use("/api/bikes", bikeRouter);
  app.use("/api/tools", toolRouter);
  app.use("/api/register", registerRouter);
  app.use("/api/users", userRouter);
  app.use("/api/brands", brandRouter);
  app.use("/api/accessories", accessoryRouter);
  app.use("/api/equipment", equipmentRouter);
  app.use("/api/events", eventRouter);
  app.use("/api/workers", workerRouter);
  app.use("/api/bookings", bookingRouter);
  app.use("/api/services", serviceRouter);
  app.use("/api/motoservices", motoServiceRouter);

  // Fallback route
  app.use("*", (_req, res) => {
    res.status(404).json({ message: "Route not found" });
  });

  app.listen(PORT, () => {
    console.log(`🚀 Сервер ${PORT} порт дээр амжилттай ажиллаж байна`);
  });
