import { RequestHandler } from "express";
import { urlModel } from "../../models/info";

export const unitURLs: RequestHandler = async (req, res) => {
  try {
    const rows = await urlModel();
    res.json(rows);
  } catch (error) {
    const error_message =
      error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: error_message });
  }
};
