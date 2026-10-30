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
 *          type: number
 *          description: A minimum value for graphical presentations on an axis
 *        max_value:
 *          type: number
 *          description: A maximum value for graphical presentations on an axis
 *        level_green:
 *          type: number
 *          description: The threshold for good results
 *        level_yellow:
 *          type: number
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
 *    Indicator:
 *      type: object
 *      properties:
 *         id:
 *           type: integer
 *           description: A unique ID number for the row in the data table
 *         ind_id:
 *           type: string
 *           description: The unique ID string of the indicator
 *         unit_level:
 *           type: string
 *           description: The organizational level of the treatment unit (hospital, HF, RHF or nation)
 *         unit_name:
 *           type: string
 *           description: The name of the treatment unit
 *         context:
 *           type: string
 *           description: Caregiver or resident
 *         year:
 *           type: integer
 *           description:  The year for which the data applies
 *         denominator:
 *           type: integer
 *           description: The number of observations
 *         var:
 *           type: number
 *           description: The value of the data point (integer for uncalculated fractions and float for calculated ratio)
 *         dg:
 *           type: number
 *           minimum: 0
 *           maximum: 1
 *           description: The percentage of coverage of the indicator
 *         delivery_time:
 *           type: string
 *           format: date-time
 *           description: The time stamp for the data delivery
 *         delivery_latest_update:
 *           type: string
 *           format: date-time
 *           description: A user defined time stamp for when the data were updated before delivery
 *         delivery_latest_affirm:
 *           type: string
 *           format: date-time
 *           description: A user defined time stamp for the point in time before which the dataset is complete
 *         type:
 *           type: string
 *           description:  The indicator type (e.g. andel, dg_andel, antall etc. )
 *         include:
 *           type: integer
 *           minimum: 0
 *           maximum: 1
 *           description: 1 if the indicator is active and 0 otherwise
 *         min_denominator:
 *           type: integer
 *           minimum: 5
 *           description: The minimum number of observations that is acceptable for showing the indicator data
 *         level_direction:
 *           type: integer
 *           minimum: 0
 *           maximum: 1
 *           description: 1 if higher values give better results and 0 otherwise
 *         level_green:
 *           type: number
 *           minimum: 0
 *           maximum: 1
 *           description: The threshold for good results
 *         level_yellow:
 *           type: number
 *           minimum: 0
 *           maximum: 1
 *           description: The threshold for mediocre results
 *         sformat:
 *           type: string
 *           description: A formatting string for the number of decimals and optional percentage sign
 *         registry_id:
 *           type: integer
 *           description: The unique ID number of the registry
 *         registry_name:
 *           type: string
 *           description: The unique ID string of the registry
 *         registry_full_name:
 *           type: string
 *           description: The official name of the registry
 *         registry_short_name:
 *           type: string
 *           description: The unifficial short name of the registry
 *         medfield_id:
 *           type: integer
 *           description: The unique ID number of the medical field to which the registry belongs
 *         medfield_name:
 *           type: string
 *           description: The unique ID string of the medical field to which the registry belongs
 *         medfield_full_name:
 *           type: string
 *           description: The name of the medical field to which the registry belongs
 *         ind_title:
 *           type: string
 *           description: The title of the indicator
 *      example:
 *        id: 6483625
 *        ind_id: ms_dg_nydiag
 *        unit_level: hf
 *        unit_name: Akershus HF
 *        context: resident
 *        year: 2017
 *        denominator: 101
 *        var: 0.77228
 *        dg: 0.77228
 *        delivery_time: 2023-12-14T14:16:43.000Z
 *        delivery_latest_update: 2023-12-12T23:00:00.000Z
 *        delivery_latest_affirm: 2022-12-31T23:00:00.000Z
 *        type: dg_andel
 *        include: 1
 *        min_denominator: null
 *        level_direction: 1
 *        level_green: 0.8
 *        level_yellow: 0.6
 *        sformat: .0%
 *        registry_id: 28
 *        registry_name: ms
 *        registry_full_name: Norsk MS-register og biobank
 *        registry_short_name: Multippel sklerose
 *        medfield_id: 5
 *        medfield_name: nerve
 *        medfield_full_name: Nervesystemet
 *        ind_title: Dekningsgrad - nydiagnostiserte
 *
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

/**
 * @swagger
 * /data/{registry}/indicators:
 *  get:
 *    summary: Get the indicator data from a registry
 *    tags: [Data]
 *    parameters:
 *      - in: path
 *        name: registry
 *        schema:
 *          type: string
 *        required: true
 *        description: The registry ID string
 *      - in: query
 *        name: id
 *        schema:
 *          type: integer
 *        required: false
 *        description: Filter for a row ID in the data table
 *      - in: query
 *        name: language
 *        schema:
 *          type: string
 *        description: The desired language of the incidator's title and description
 *      - in: query
 *        name: unit_level
 *        schema:
 *          type: string
 *        description: Filter for the desired unit level (hospital, hf, rhf or nation)
 *      - in: query
 *        name: year
 *        schema:
 *          type: integer
 *        description: Filter for the desired year
 *      - in: query
 *        name: unit_name
 *        schema:
 *          type: string
 *        description: Filter for the desired treatment unit
 *      - in: query
 *        name: context
 *
 *      - in: query
 *        name: type
 *
 *      - in: query
 *        name: register
 *
 *      - in: query
 *        name: nordic
 *
 *
 */
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
