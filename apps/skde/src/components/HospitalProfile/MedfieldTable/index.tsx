import { level, minDG } from "qmongjs";
import type { Indicator } from "types";

export type RowData = {
  name: string;
  green: number;
  yellow: number;
  red: number;
  registers: {
    name: string;
    full_name: string;
    short_name: string;
    id: string;
    green: number;
    yellow: number;
    red: number;
  }[];
  unitNames: string[];
};

export const createMedfieldTableData = (data: Indicator[]) => {
  // Set indicator colour from value and colour limits
  const levels = data.map((row) => {
    const indicatorLevel = level(row);
    return {
      ind_id: row.ind_id,
      registry_id: row.registry_id,
      registry_name: row.registry_name,
      registry_full_name: row.registry_full_name,
      registry_short_name: row.registry_short_name,
      medfield_id: row.medfield_id,
      medfield_full_name: row.medfield_full_name,
      // TODO: Do not allow null to go through
      level: row.dg === null || row.dg >= minDG ? indicatorLevel : undefined,
    };
  });

  // Group by medfield and registry and initialise counts
  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  const rowData: RowData[] = levels.reduce((result: any[], value) => {
    if (!result[value.medfield_id]) {
      result[value.medfield_id] = {
        name: value.medfield_full_name,
        green: 0,
        yellow: 0,
        red: 0,
        registers: [],
      };
    }

    result[value.medfield_id].registers[value.registry_id] = {
      name: value.registry_name,
      full_name: value.registry_full_name,
      short_name: value.registry_short_name,
      green: 0,
      yellow: 0,
      red: 0,
    };

    return result;
  }, []);

  // Count levels
  for (let i = 0; i < levels.length; i++) {
    const registry_id = levels[i].registry_id;
    const medfield_id = levels[i].medfield_id;
    const level = levels[i].level;

    if (level === "H") {
      rowData[medfield_id].green += 1;
      rowData[medfield_id].registers[registry_id].green += 1;
    }

    if (level === "M") {
      rowData[medfield_id].yellow += 1;
      rowData[medfield_id].registers[registry_id].yellow += 1;
    }

    if (level === "L") {
      rowData[medfield_id].red += 1;
      rowData[medfield_id].registers[registry_id].red += 1;
    }
  }

  return rowData;
};
