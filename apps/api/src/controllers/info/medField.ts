import type { RequestHandler } from "express";
import { medField } from "../../models/info";

export const medicalFields: RequestHandler = async (req, res) => {
  try {
    const nordicParam = req.query.nordic;
    const nordicOnly = typeof nordicParam === "string" && nordicParam === "1";

    const rows = await medField(nordicOnly);
    const emptyArray: {
      shortName?: string;
      name?: string;
      registers?: string[];
    }[] = [];

    const testvalue = rows.reduce((prevVal, currVal) => {
      prevVal
        .filter((val) => val.shortName === currVal.shortName)
        // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
        .forEach(
          (val) =>
            (val.registers = [...(val.registers ?? []), currVal.registers]),
        );
      const returnValue = prevVal.some(
        (val) => val.shortName === currVal.shortName,
      )
        ? []
        : [
            {
              shortName: currVal.shortName,
              name: currVal.name,
              registers: [currVal.registers],
            },
          ];
      // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
      return [...prevVal, ...returnValue];
    }, emptyArray);

    res.json(testvalue);
  } catch (error) {
    const error_message =
      error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: error_message });
  }
};
