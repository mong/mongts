import express from "express";
import {
  descriptionController,
  indicatorsController,
  unitNamesController,
  selectionYearsController,
  dataController,
  registryRankController,
  registryEvaluationController,
  registryScoresController,
  registryRequirementsController,
} from "../controllers/data";

const Router = express.Router();

//per reg: inicator beskrivelse, query-type: dg/ind
Router.get("/:register/descriptions", descriptionController);

//indicator veridier per enhet(en, flere eller ingen), unit level, per år, enheter (alle per år),
Router.get("/:register/indicators", indicatorsController);

//reg all-all eller per register
Router.get("/:register/unitNames", unitNamesController);

Router.get("/:register/years", selectionYearsController);

// Nested data output
Router.get("/:register/nestedData", dataController);

// Registry rank output
Router.get("/registryRank", registryRankController);

// Registry evaluation output
Router.get("/registryEvaluation", registryEvaluationController);

// Registry scores output
Router.get("/registryScores", registryScoresController);

// Registry requirements output
Router.get("/registryRequirements", registryRequirementsController);

export default Router;
