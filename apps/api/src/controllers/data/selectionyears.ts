import { RequestHandler, Request } from "express";
import { selectionYearsModel, Filter } from "../../models/data";

interface Query {
  filter: Filter;
}

export const selectionYearsContoller: RequestHandler = async (req, res) => {
  const query = parseQuery(req);

  try {
    const selectionYears = await selectionYearsModel(query.filter);
    res.json(selectionYears.map((d) => d.year));
  } catch (error) {
    const error_message =
      error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: error_message });
  }
};

function parseQuery(req: Request): Query {
  const query: Query = { filter: {} };

  if (typeof req.query === "object" && !Array.isArray(req.query)) {
    query.filter.register = req.params.register;
  }
  if (typeof req.query.context === "string") {
    query.filter.context = req.query.context;
  }
  if (typeof req.query.type === "string") {
    query.filter.type = req.query.type;
  }

  return query;
}
