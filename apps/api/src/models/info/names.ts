import db from "../../db";
import { RegisterName } from "types";

export const registerNamesModel = (): Promise<RegisterName[]> =>
  db
    .select("id", "name as rname", "full_name", "vw_registry_contexts.*")
    .from("registry")
    .leftJoin(
      "vw_registry_contexts",
      "registry.name",
      "vw_registry_contexts.registry_name",
    );
