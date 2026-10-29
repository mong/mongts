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
 *          type: 0 | 1
 *          description: Flag to indicate whether the registry has data from other Nordic countries
 *        registry_name:
 *          type: string
 *          description: Same as rname
 *        caregiver_data:
 *          type: 0 | 1 | null
 *          description: Flag to indicate whether the registry has caregiver data
 *        resident_data:
 *          type: 0 | 1 | null
 *          description: Flag to indicate whether the registry has resident data
 *        dg_data:
 *          type: 0 | 1 | null
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
 * tags:
 *   name: Quality indicator API
 *   description: The API for national quality indicators
 * /info/names:
 *   get:
 *     summary: List of all registries
 *     tags: [RegisterName]
 *     responses:
 *       200:
 *          description: The list of all registries
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  @ref: '#/components/schemas/RegisterName
 *       500:
 *         description: Some server error
 */
Router.get("/names", registerNames);

// the medical fields and the registers within them
Router.get("/medicalFields", medicalFields);

// the urls to the unit web sites
Router.get("/url", unitURLs);

// indicators, units and years with resident data
Router.get("/residentData", residentData);

export default Router;
