import { RequestHandler } from "express";
import { registryRequirementsModel } from "../../models/data";

export const registryRequirementsController: RequestHandler = async (
  req,
  res,
) => {
  try {
    const rows = await registryRequirementsModel();
    res.json(rows);
  } catch (error) {
    const error_message =
      error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: error_message });
  }
};
