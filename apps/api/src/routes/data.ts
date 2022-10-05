import express from "express";
import {
  descriptionController,
  indicatorsContoller,
  unitNamesContoller,
  selectionYearsContoller,
} from "../controllers/data";

const Router = express.Router();

//per reg: inicator beskrivelse, query-type: dg/ind
Router.get("/:register/descriptions", descriptionController);

//indicator veridier per enhet(en, flere eller ingen), unit level, per år, enheter (alle per år),
Router.get("/:register/indicators", indicatorsContoller);

//reg all-all eller per register
Router.get("/:register/unitNames", unitNamesContoller);

Router.get("/:register/years", selectionYearsContoller);

export default Router;
