import type { RequestHandler } from "express";
import { nestedData } from "../../helpers/functions";
import { aggData, indTable, medfieldTable, regTable } from "../../models/data";
import { parseQuery } from "./indicators";

export const dataController: RequestHandler = async (req, res) => {
  const query = parseQuery(req);
  try {
    const aggdata = await aggData(query.filter);
    const registries = await regTable(query.filter);
    const indicators = await indTable(query.filter);
    const medfields = await medfieldTable();
    const rows = nestedData(registries, indicators, aggdata, medfields);
    res.json(rows);
  } catch (error) {
    const error_message =
      error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: error_message });
  }
};
