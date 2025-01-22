import { RequestHandler } from "express";
import { registryEvaluationModel } from "../../models/data";
import { parseQuery } from "./indicators";

export const registryEvaluationController: RequestHandler = async (
  req,
  res,
) => {
  const query = parseQuery(req);

  try {
    const rows = await registryEvaluationModel(query.filter);
    res.json(rows);
  } catch (error) {
    const error_message =
      error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: error_message });
  }
};
