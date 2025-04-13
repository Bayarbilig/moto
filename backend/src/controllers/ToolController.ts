import { Request, Response } from "express";
import ToolModel from "../models/ToolModel";

// Create
export const createTool = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tool = await ToolModel.create(req.body);
    res.status(201).json(tool);
  } catch (err) {
    res.status(400).json({ error: "Failed to create tool", details: err });
  }
};

// Read all
export const getTools = async (_req: Request, res: Response): Promise<void> => {
  try {
    const tools = await ToolModel.find();
    res.status(200).json(tools);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tools", details: err });
  }
};

// Read one
export const getToolById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tool = await ToolModel.findById(req.params.id);
    if (!tool) {
      res.status(404).json({ error: "Tool not found" });
      return;
    }
    res.status(200).json(tool);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tool", details: err });
  }
};

// Update
export const updateTool = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tool = await ToolModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tool) {
      res.status(404).json({ error: "Tool not found" });
      return;
    }
    res.status(200).json(tool);
  } catch (err) {
    res.status(400).json({ error: "Failed to update tool", details: err });
  }
};

// Delete
export const deleteTool = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tool = await ToolModel.findByIdAndDelete(req.params.id);
    if (!tool) {
      res.status(404).json({ error: "Tool not found" });
      return;
    }
    res.status(200).json({ message: "Tool deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete tool", details: err });
  }
};
