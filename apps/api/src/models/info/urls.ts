import type { URLs } from "types";
import db from "../../db";

export const urlModel = (): Promise<URLs[]> =>
  db
    .select("short_name as shortName", "url")
    .from("hf")
    .whereNotNull("url")
    .union(function () {
      this.select("short_name as shortName", "url")
        .from("rhf")
        .whereNotNull("url");
    });
