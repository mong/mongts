import express from "express";
import { medicalFields, registerNames, unitURLs } from "../controllers/info";

const Router = express.Router();

// the short and full names of the registries
Router.get("/names", registerNames);

// the medical fields and the registers within them
Router.get("/medicalFields", medicalFields);

// the urls to the unit web sites
Router.get("/url", unitURLs);

export default Router;
