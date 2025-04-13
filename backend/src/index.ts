import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database/mongoDB";
import dotenv from "dotenv";
import bikeRouter from "./routes/BikeRoute";
import toolRouter from "./routes/ToolRoute";
import router from "./routes/RegistrationRoute";

dotenv.config();

const app = express();
const port = 5000;

connectToDatabase();

app.use(express.json());
app.use(cors());
app.use("/api/bike", bikeRouter);
app.use("/api/tools", toolRouter);
app.use("/api/register", router);
app.listen(port, () => {
  console.log(`Сервер ${port} порт дээр ажиллаж байна`);
});
