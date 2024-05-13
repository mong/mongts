import { RequestHandler } from "express";

export const dataController: RequestHandler = async (req, res) => {
  res.json({ data: "test" });
};
