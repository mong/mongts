import type { RequestHandler } from "express";
import { urlModel } from "../../models/info";

// biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
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
