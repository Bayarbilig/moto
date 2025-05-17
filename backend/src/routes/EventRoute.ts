import express from "express";
import {
  createEvent,
  getEvents,
  deleteEvent,
  getEventById,
} from "../controllers/EventController";

const eventRouter = express.Router();

// POST /api/events
eventRouter.post("/", createEvent);

// GET /api/events
eventRouter.get("/", getEvents);

// DELETE /api/events/:id
eventRouter.delete("/:id", deleteEvent);
eventRouter.get("/:id", getEventById);

export default eventRouter;
