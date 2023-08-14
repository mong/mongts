import { validateTreatmentUnits } from "../";

const optstu = [
  { label: "Sykehus", options: [{ value: "Narvik", label: "Narvik" }] },
  { label: "HF", options: [{ value: "UNN", label: "UNN" }] },
  { label: "RHF", options: [{ value: "Helse Nord", label: "Helse Nord" }] },
];

test("Returns correct results", () => {
  expect(validateTreatmentUnits(["Narvik"], optstu)).toEqual(["Narvik"]);
  expect(validateTreatmentUnits(["UNN"], optstu)).toEqual(["UNN"]);
  expect(validateTreatmentUnits(["Helse Nord"], optstu)).toEqual([
    "Helse Nord",
  ]);
  expect(
    validateTreatmentUnits(["Narvik", "UNN", "Helse Nord"], optstu),
  ).toEqual(["Narvik", "UNN", "Helse Nord"]);
  expect(validateTreatmentUnits([], optstu)).toEqual([]);
  expect(validateTreatmentUnits(["Alta"], optstu)).toEqual([]);
  expect(
    validateTreatmentUnits(
      ["Narvik", "UNN", "Helse Nord", "Harstad", "Alta"],
      optstu,
    ),
  ).toEqual(["Narvik", "UNN", "Helse Nord"]);
  expect(validateTreatmentUnits(["Narvik"], [])).toEqual([]);
});
