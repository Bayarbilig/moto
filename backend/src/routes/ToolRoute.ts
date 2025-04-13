import express from "express";
import {
  createTool,
  deleteTool,
  getToolById,
  getTools,
  updateTool,
} from "../controllers/ToolController";

const toolRouter = express.Router();

toolRouter.post("/", createTool);
toolRouter.get("/", getTools);
toolRouter.get("/:id", getToolById);
toolRouter.put("/:id", updateTool);
toolRouter.delete("/:id", deleteTool);

export default toolRouter;
