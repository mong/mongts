import express from "express";
import {
  descriptionController,
  indicatorsContoller,
  unitNamesContoller,
  selectionYearsContoller,
  dataController,
  registryRankController,
  registryEvaluationController,
  registryScoresController,
} from "../controllers/data";

const Router = express.Router();

//per reg: inicator beskrivelse, query-type: dg/ind
Router.get("/:register/descriptions", descriptionController);

//indicator veridier per enhet(en, flere eller ingen), unit level, per år, enheter (alle per år),
Router.get("/:register/indicators", indicatorsContoller);

//reg all-all eller per register
Router.get("/:register/unitNames", unitNamesContoller);

Router.get("/:register/years", selectionYearsContoller);

// Nested data output
Router.get("/:register/nestedData", dataController);

// Registry rank output
Router.get("/registryRank", registryRankController);

// Registry evaluation output
Router.get("/registryEvaluation", registryEvaluationController);

// Registry scores output
Router.get("/registryScores", registryScoresController);

export default Router;
