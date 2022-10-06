import { RequestHandler } from "express";
import { registerNamesModel } from "../../models/info";

export const registerNames: RequestHandler = async (req, res) => {
  try {
    const rows = await registerNamesModel();
    res.json(rows);
  } catch (error) {
    const error_message =
      error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: error_message });
  }
};
