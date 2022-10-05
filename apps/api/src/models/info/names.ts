import db from "../../db";

export interface RegisterName {
  id: number;
  rname: string;
  full_name: string;
  caregiver_data: 0 | 1 | null;
  resident_data: 0 | 1 | null;
  dg_data: 0 | 1 | null;
  url: string | null;
  description: string | null;
}

export const registerNamesModel = (): Promise<RegisterName[]> =>
  db
    .select("id", "name as rname", "full_name", "vw_registry_contexts.*")
    .from("registry")
    .leftJoin(
      "vw_registry_contexts",
      "registry.name",
      "vw_registry_contexts.registry_name"
    );
