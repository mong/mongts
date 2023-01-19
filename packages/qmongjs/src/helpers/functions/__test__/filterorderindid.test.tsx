import { filterOrderIndID } from "../.";
import { hisreg_data, hisreg_descr } from "../../../test/test_data/hisreg";

const hisreg_national = hisreg_data.filter((d) => {
  return d.unit_name === "Nasjonalt";
});
const hisreg_haukland = hisreg_data.filter((d) => {
  return d.unit_name !== "Nasjonalt";
});

test("Returns correct level with direction 0", () => {
  expect(
    filterOrderIndID(
      false,
      ["Nasjonalt"],
      hisreg_national,
      hisreg_descr,
      "",
      "singleRegister"
    )
  ).toStrictEqual([
    "hisreg_henvist_spesialist_1aar",
    "hisreg_full_responder",
    "hisreg_kompl_kir",
  ]);
});
test("Do not filter if national data and length of units is 1", () => {
  expect(
    filterOrderIndID(
      false,
      ["qwerty"],
      hisreg_haukland,
      hisreg_descr,
      "",
      "allRegistries"
    )
  ).toStrictEqual([
    "hisreg_henvist_spesialist_1aar",
    "hisreg_full_responder",
    "hisreg_kompl_kir",
  ]);
});
test("Filter away everything if national data, but length of units more than 1", () => {
  expect(
    filterOrderIndID(
      false,
      ["qwerty", "test"],
      hisreg_national,
      hisreg_descr,
      "",
      "allRegistries"
    )
  ).toStrictEqual([]);
});
test("Do not filter on single registry page even if national data and length of units more than 1", () => {
  expect(
    filterOrderIndID(
      false,
      ["qwerty", "test"],
      hisreg_national,
      hisreg_descr,
      "",
      "singleRegister"
    )
  ).toStrictEqual([
    "hisreg_henvist_spesialist_1aar",
    "hisreg_full_responder",
    "hisreg_kompl_kir",
  ]);
});
test("Do not filter if national data and length of units more than 1, but fetching data is true", () => {
  expect(
    filterOrderIndID(
      true,
      ["qwerty", "test"],
      hisreg_national,
      hisreg_descr,
      "",
      "allRegistries"
    )
  ).toStrictEqual([
    "hisreg_henvist_spesialist_1aar",
    "hisreg_full_responder",
    "hisreg_kompl_kir",
  ]);
});
test("Keep only level H", () => {
  expect(
    filterOrderIndID(
      false,
      ["qwerty"],
      hisreg_national,
      hisreg_descr,
      "H",
      "allRegistries"
    )
  ).toStrictEqual(["hisreg_full_responder"]);
});
test("Keep only level M", () => {
  expect(
    filterOrderIndID(
      false,
      ["qwerty"],
      hisreg_national,
      hisreg_descr,
      "M",
      "allRegistries"
    )
  ).toStrictEqual(["hisreg_henvist_spesialist_1aar"]);
});
test("Keep only level L", () => {
  expect(
    filterOrderIndID(
      false,
      ["qwerty"],
      hisreg_national,
      hisreg_descr,
      "L",
      "allRegistries"
    )
  ).toStrictEqual(["hisreg_kompl_kir"]);
});
test("Keep only level M with all data", () => {
  expect(
    filterOrderIndID(
      false,
      ["qwerty", "test"],
      hisreg_data,
      hisreg_descr,
      "M",
      "allRegistries"
    )
  ).toStrictEqual(["hisreg_full_responder"]);
});
test("Filter out data with low dg and low denominator", () => {
  expect(
    filterOrderIndID(
      false,
      ["qwerty", "test"],
      hisreg_data,
      hisreg_descr,
      "H",
      "allRegistries"
    )
  ).toStrictEqual([]);
});
