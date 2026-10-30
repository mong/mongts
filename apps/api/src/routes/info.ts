/**
 * @swagger
 * components:
 *  schemas:
 *    RegisterName:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: Unique id number for registry
 *        rname:
 *          type: string
 *          description: Unique id string for the registry
 *        full_name:
 *          type: string
 *          description: The official name of the registry
 *        short_name:
 *          type: string
 *          descripton: The unofficial short name of the registry
 *        nordic:
 *          type: integer
 *          description: Flag to indicate whether the registry has data from other Nordic countries
 *        registry_name:
 *          type: string
 *          description: Same as rname
 *        caregiver_data:
 *          type: integer
 *          nullable: true
 *          description: Flag to indicate whether the registry has caregiver data
 *        resident_data:
 *          type: integer
 *          nullable: true
 *          description: Flag to indicate whether the registry has resident data
 *        dg_data:
 *          type: integer
 *          nullable: true
 *          description: Flag to indicate whether the registry has coverage data
 *        url:
 *          type: string
 *          description: URL to the registry's site at kvalitetsregistre.no
 *      example:
 *        id: 1
 *        rname: hjerneslag
 *        short_name: Hjerneslag
 *        nordic: 0
 *        registry_name: hjerneslag
 *        caregiver_data: 1
 *        resident_data: 1
 *        dg_data: 1
 *        url: https://www.kvalitetsregistre.no/registeroversikt/norsk-hjerneslagregister
 *    Medfield:
 *      type: object
 *      properties:
 *        shortName:
 *          type: string
 *          description: Short name of the medical field
 *        name:
 *          type: string
 *          description: Full name of the medical field
 *        registers:
 *          type: array
 *          items:
 *            type: string
 *          description: A list of the registries belonging to the medical field
 *      example:
 *        - shortName: hjerte
 *          name: Hjerte- og karsykdommer
 *          registers: [hjerneslag,hjerteinfarkt,noric,norkar,hjertesvikt,hjertestans,ablanor,hjertekirurgi]
 *        - shortname: luft
 *          name: Luftveier
 *          registers: [mekvent]
 *    URLs:
 *      type: object
 *      properties:
 *        shortName:
 *          type: string
 *          description: The short name of the HF or RHF
 *      example:
 *        - shortName: Førde HF
 *          url: https://www.helse-forde.no/
 *        - shortName: Nord-Trøndelag HF
 *          url: https://www.hnt.no/
 *        - shortName: Finnmark HF
 *          url: https://www.finnmarkssykehuset.no/
 *    ResidentData:
 *      type: object
 *      properties:
 *        indicatorID:
 *          type: string
 *          description: The unique ID string of the indicator
 *        registry:
 *          type: string
 *          description: The unique ID string of the registry
 *        year:
 *          type: integer
 *          description: The year for which the data applies
 *        unitName:
 *          type: string
 *          description: The name of the resident area
 *        level:
 *          type: string
 *          description: the level of the indicator for the given tear and resident area
 * tags:
 *  name: Info
 *  description: Information about the registries
 */

import express from "express";
import {
  medicalFields,
  registerNames,
  residentData,
  unitURLs,
} from "../controllers/info";

const Router = express.Router();

/**
 * @swagger
 * /info/names:
 *  get:
 *    summary: List of all registries
 *    tags: [Info]
 *    responses:
 *      200:
 *        description: The list of all registries
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/RegisterName"
 *      500:
 *        description: Some server error
 */
Router.get("/names", registerNames);

/**
 * @swagger
 * /info/medicalFields:
 *  get:
 *    summary: List of all medical fields
 *    tags: [Info]
 *    parameters:
 *      - in: query
 *        name: nordic
 *        schema:
 *          type: integer
 *        required: false
 *        description: 1 for Nordic registries and 0 for non-Nordic
 *    responses:
 *      200:
 *        description: The list of medical fields
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Medfield"
 *      500:
 *        description: Some server error
 */
Router.get("/medicalFields", medicalFields);

/**
 * @swagger
 * /info/url:
 *  get:
 *    summary: List of URLs to tHF and RHF websites
 *    tags: [Info]
 *    responses:
 *      200:
 *        description: The list of URLs
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/URLs"
 *      500:
 *        description: Some server error
 */
Router.get("/url", unitURLs);

/**
 * @swagger
 * /info/residentData:
 *  get:
 *    summary: Resident data results
 *    tags: [Info]
 *    parameters:
 *      - in: query
 *        name: registry
 *        schema:
 *          type: string
 *        required: false
 *        description: Filter for single registries
 *    responses:
 *      200:
 *        description: The list of resident data results
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/ResidentData"
 *      500:
 *        description: Some server error
 */
Router.get("/residentData", residentData);

export default Router;
