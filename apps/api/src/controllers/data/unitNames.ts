import { RequestHandler, Request } from "express";
import {
  distinctUnitNamesRegister,
  unitNamesAllLevels,
  Filter,
} from "../../models/data";
import { createOptsTu, nestTuNames } from "../../helpers/functions";

interface Query {
  filter: Filter;
}

export const unitNamesContoller: RequestHandler = async (req, res) => {
  const query = parseQuery(req);

  try {
    const distinctUnitNames = await distinctUnitNamesRegister(query.filter);
    const allUnitNames = await unitNamesAllLevels();
    const opts_tu = createOptsTu(distinctUnitNames, allUnitNames);
    const nestedUnitNames = nestTuNames(allUnitNames, opts_tu);

    const rows = {
      opts_tu,
      nestedUnitNames,
    };
    res.json(rows);
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
  if (typeof req.query.year === "string") {
    const year = Number(req.query.year) || undefined;
    query.filter.year = year;
  }

  return query;
}
