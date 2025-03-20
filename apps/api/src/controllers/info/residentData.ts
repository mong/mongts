import { RequestHandler, Request } from "express";
import { residentDataModel, Filter } from "../../models/info";

export const residentData: RequestHandler = async (req, res) => {
  const query = parseQuery(req);

  try {
    const rows = await residentDataModel(query.filter);
    res.json(rows);
  } catch (error) {
    const error_message =
      error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: error_message });
  }
};

type Query = {
  filter?: Filter;
};

const parseQuery = (req: Request) => {
  const query: Query = {};

  if (typeof req.query === "object" && !Array.isArray(req.query)) {
    query.filter = {};

    if (typeof req.query.registry === "string") {
      query.filter.registry = req.query.registry;
    }
  }

  return query;
};
