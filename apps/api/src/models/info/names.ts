import type { RegisterName } from "types";
import db from "../../db";

export const registerNamesModel = (): Promise<RegisterName[]> =>
  db
    .select(
      "id",
      "name as rname",
      "full_name",
      "short_name",
      "vw_registry_contexts.*",
    )
    .from("registry")
    .leftJoin(
      "vw_registry_contexts",
      "registry.name",
      "vw_registry_contexts.registry_name",
    );
