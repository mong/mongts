import { getLastCompleteYear } from "../getLastCompleteYear";
import { describe, it, expect } from "vitest";

describe("getLastCompleteYear", () => {
  it("should return the last complete year if it is before the treatment year", () => {
    const delivery_latest_affirm = new Date("2021-01-01");
    const treatmentYear = 2021;
    const lastCompleteYear = getLastCompleteYear(
      delivery_latest_affirm,
      treatmentYear,
    );

    expect(lastCompleteYear).toEqual(2020);
  });

  it("should return the last complete year if it is before the treatment year, even if date is in december", () => {
    const delivery_latest_affirm = new Date("2020-12-31");
    const treatmentYear = 2021;
    const lastCompleteYear = getLastCompleteYear(
      delivery_latest_affirm,
      treatmentYear,
    );

    expect(lastCompleteYear).toEqual(2020);
  });

  it("should return undefined if the delivery_latest_affirm date is not available", () => {
    const treatmentYear = 2021;
    const lastCompleteYear = getLastCompleteYear(null, treatmentYear);

    expect(lastCompleteYear).toBeUndefined();
  });

  it("should return undefined if the last complete year is after the treatment year", () => {
    const delivery_latest_affirm = new Date("2022-01-01");
    const treatmentYear = 2021;
    const lastCompleteYear = getLastCompleteYear(
      delivery_latest_affirm,
      treatmentYear,
    );

    expect(lastCompleteYear).toBeUndefined();
  });

  it("should return the last complete year if alwaysReturnYear is true", () => {
    const delivery_latest_affirm = new Date("2022-01-01");
    const treatmentYear = 0;
    const lastCompleteYear = getLastCompleteYear(
      delivery_latest_affirm,
      treatmentYear,
      true,
    );
    expect(lastCompleteYear).toEqual(2021);
  });
});
