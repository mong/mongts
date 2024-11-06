import { formatUnitNameIfNational } from "../formatUnitNameIfNational";
import { describe, it, expect } from "vitest";

describe("formatUnitNameIfNational", () => {
  it('returns the original unit name when it\'s not "Nasjonalt"', () => {
    const unitName = "Test Unit";
    const result = formatUnitNameIfNational(unitName, true);
    expect(result).toBe(unitName);
  });

  it('returns "Hele landet" when the unit name is "Nasjonalt" and firstLettetUpperCase is true', () => {
    const unitName = "Nasjonalt";
    const result = formatUnitNameIfNational(unitName, true);
    expect(result).toBe("Hele landet");
  });

  it('returns "hele landet" when the unit name is "Nasjonalt" and firstLettetUpperCase is false', () => {
    const unitName = "Nasjonalt";
    const result = formatUnitNameIfNational(unitName, false);
    expect(result).toBe("hele landet");
  });

  it('is case-sensitive and returns the original unit name when the unit name is "nasjonalt" (lowercase)', () => {
    const unitName = "nasjonalt";
    const result = formatUnitNameIfNational(unitName, true);
    expect(result).toBe(unitName);
  });
});
