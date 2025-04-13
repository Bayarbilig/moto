import express from "express";
import {
  createRegistration,
  getRegistrations,
} from "../controllers/RegistrationController";

const router = express.Router();

router.post("/", createRegistration);
router.get("/", getRegistrations);

export default router;
