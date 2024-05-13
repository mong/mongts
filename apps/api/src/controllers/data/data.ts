import { RequestHandler } from "express";
import { nestedDataModel } from "../../models/data";
import { parseQuery } from "./indicators";

export const dataController: RequestHandler = async (req, res) => {
  const query = parseQuery(req);
  try {
    const rows = await nestedDataModel(query.filter);
    res.json(rows);
  } catch (error) {
    const error_message =
      error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: error_message });
  }
};
