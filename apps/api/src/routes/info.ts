import express from "express";
import { medicalFields, registerNames } from "../controllers/info";

const Router = express.Router();

// the short and full names of the registries
Router.get("/names", registerNames);

// the medical fields and the registers within them
Router.get("/medicalFields", medicalFields);

export default Router;
