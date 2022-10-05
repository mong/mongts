import db from "../../db";

export interface MedFieldInterface {
  shortName: string;
  name: string;
  registers: string;
}

const medField = (): Promise<MedFieldInterface[]> =>
  db
    .select(
      "mf.name as shortName",
      "mf.full_name as name",
      "r.name as registers"
    )
    .from("registry_medfield as rmf")
    .leftJoin("medfield as mf", "rmf.medfield_id", "mf.id")
    .join("registry as r", "rmf.registry_id", "r.id")
    .orderBy("mf.id")
    .orderBy("r.id");

export default medField;
