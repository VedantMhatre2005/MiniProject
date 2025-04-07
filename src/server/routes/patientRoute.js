import express from "express";
import { fetch, createPatient, update, deletePatient } from "../controller/patientController.js";

const router = express.Router();

// Define routes for patient operations
router.get("/getAllPatients", fetch); // Fetch all patients
router.post("/", createPatient); // Create a new patient
router.put("/:id", update); // Update a patient by ID
router.delete("/:id", deletePatient); // Delete a patient by ID

export default router;
