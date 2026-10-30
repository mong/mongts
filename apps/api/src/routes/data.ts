/**
 * @swagger
 * components:
 *  schemas:
 *    Description:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: Unique indicator ID string
 *        dg_id:
 *          type: string
 *          description: Unique DG indicator ID string
 *        include:
 *          type: integer
 *          description: 1 if the indicator is active and 0 otherwise
 *        title:
 *          type: string
 *          description: The indicator's title
 *        name:
 *          type: string
 *          description: A string used for sorting the indicators for each registry
 *        type:
 *          type: string
 *          description: The indicator type, e.g. andel, dg_andel, antall etc.
 *        sformat:
 *          type: string
 *          description: A formatting specification for number of decimals and percentage sign
 *        measure_unit:
 *          type: string
 *          description: A unit for what the indicator measures
 *        min_denominator:
 *          type: integer
 *          description: The minimum number of data points in the given year that is acceptable for showing the data
 *        min_value:
 *          type: float
 *          description: A minimum value for graphical presentations on an axis
 *        max_value:
 *          type: float
 *          description: A maximum value for graphical presentations on an axis
 *        level_green:
 *          type: float
 *          description: The threshold for good results
 *        level_yellow:
 *          type: float
 *          description: The threshold for mediocre results
 *        level_direction:
 *          type: integer
 *          description: 1 if high indicator results are desirable and 0 otherwise
 *        short_description:
 *          type: string
 *          description: A short indicator description of 1023 characters or less
 *        long_description:
 *          type: string
 *          description: A long indicator description of 2047 characters or less
 *        registry_id:
 *          type: integer
 *          description: The unique ID number of the registry to which the indicator belongs
 *        rname:
 *          type: string
 *          description: The unique ID string of the registry to which the indicator belongs
 *        full_name:
 *          type: string
 *          description: The official name of the registry to which the indicator belongs
 *      example:
 *        - id: ms_attakkstatus
 *          dg_id: ms_dg_total
 *          include: 0
 *          title: Oppdatert attakkstatus
 *          name: d
 *          type: andel
 *          sformat: .0%
 *          measure_unit: null
 *          min_denominator: 5
 *          min_value: null
 *          max_value: null
 *          level_green: 0.8
 *          level_yellow: 0.6
 *          level_direction: 1
 *          short_description: Andel med oppdatert attakkstatus i løpet av siste år
 *          long_description: Et attakk er en periode med forverring av sykdommen med varighet på minst 24 timer og resulterer oftest i kontakt med spesialisthelsetjenesten. Å fange opp informasjon om alle attakk er viktig for at nevrologen skal kunne vurdere om det er grunnlag for å starte eller endre MS-behandlingen. Altså et viktig kvalitetsmål i oppfølgingen av en MS-pasient. Denne indikatoren måler andel av pasientene som har fått oppdatert sine opplysninger om attakk siste år. Dette inkluderer kun de ca 85% av pasienten som har den attakkvise formen for MS.
 *          registry_id: 28
 *          rname: ms
 *          full_name: Norsk MS-register og biobank
 * tags:
 *  name: Data
 *  description: Quality indicator data from the registries
 */

import express from "express";
import {
  dataController,
  descriptionController,
  indicatorsController,
  registryEvaluationController,
  registryRankController,
  registryRequirementsController,
  registryScoresController,
  selectionYearsController,
  unitNamesController,
} from "../controllers/data";

const Router = express.Router();

/**
 * @swagger
 * /data/{registry}/descriptions:
 *  get:
 *    summary: Get metadata about the indicators for a registry
 *    tags: [Data]
 *    parameters:
 *      - in: path
 *        name: registry
 *        schema:
 *          type: string
 *        required: true
 *        description: The registry ID string
 *    responses:
 *      200:
 *        description: The indicator metadata
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Description"
 *      500:
 *        description: Some server error
 */
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
