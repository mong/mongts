import { ObjectIDToBoHF } from "../../src/charts/Map";

type UnitName2BohfMapping = { unitName: string; bohfNames: string[] }[];

const unitName2BohfNames: UnitName2BohfMapping = [
  {
    unitName: "Helse Nord RHF",
    bohfNames: ["Finnmark", "UNN", "Nordland", "Helgeland"],
  },
  {
    unitName: "Helse Midt-Norge RHF",
    bohfNames: ["Nord-Trøndelag", "St. Olav", "Møre og Romsdal"],
  },
  {
    unitName: "Helse Vest RHF",
    bohfNames: ["Førde", "Bergen", "Fonna", "Stavanger"],
  },
  {
    unitName: "Helse Sør-Øst RHF",
    bohfNames: [
      "Østfold",
      "Akershus",
      "OUS",
      "Lovisenberg",
      "Diakonhjemmet",
      "Innlandet",
      "Vestre Viken",
      "Telemark",
      "Vestfold",
      "Sørlandet",
      "Indre Oslo",
    ],
  },
  { unitName: "Finnmark HF", bohfNames: ["Finnmark"] },
  { unitName: "UNN HF", bohfNames: ["UNN"] },
];

export const mapUnitName2BohfNames = (unitName: string) => {
  const filteredMap = unitName2BohfNames.filter((obj) => {
    return obj.unitName === unitName;
  })[0];

  if (filteredMap) {
    return filteredMap.bohfNames.map((bohfName) => {
      return ObjectIDToBoHF.filter((obj) => {
        return obj.bohf === bohfName;
      })[0].BoHF_num;
    });
  } else {
    return null;
  }
};
