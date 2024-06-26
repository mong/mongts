import db from "../../db";
import { URLs } from "types";

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
