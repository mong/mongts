import { RequestHandler, Request } from "express";
import { indicatorsModel, Filter } from "../../models/data";

export const indicatorsContoller: RequestHandler = async (req, res) => {
  const query = parseQuery(req);

  try {
    const rows = await indicatorsModel(query.filter);
    res.json(rows);
  } catch (error) {
    const error_message =
      error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: error_message });
  }
};

interface Query {
  filter?: Filter;
}

function parseQuery(req: Request): Query {
  const query: Query = {};

  if (typeof req.query === "object" && !Array.isArray(req.query)) {
    query.filter = {};

    if (typeof req.query.unit_level === "string") {
      query.filter.unit_level = req.query.unit_level;
    }
    if (Array.isArray(req.query.unit_name)) {
      const unit_name = req.query.unit_name as string[];
      query.filter.unit_name = unit_name;
    }
    if (typeof req.query.year === "string") {
      const year = Number(req.query.year) || undefined;
      query.filter.year = year;
    }
    if (typeof req.query.context === "string") {
      query.filter.context = req.query.context;
    }
    if (typeof req.query.type === "string") {
      query.filter.type = req.query.type;
    }
    query.filter.register = req.params.register;
  }
  return query;
}
