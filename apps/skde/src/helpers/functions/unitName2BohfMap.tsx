import { ObjectIDToBoHF } from "../../charts/Map";
import { TreeViewFilterSectionNode } from "qmongjs/src/components/FilterMenu/TreeViewFilterSection";

type UnitName2BohfMapping = { unitName: string; bohfNames: string[] }[];

// Map from short_name to bohf names
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
  { unitName: "Nordland HF", bohfNames: ["Nordland"] },
  { unitName: "Helgeland HF", bohfNames: ["Helgeland"] },
  { unitName: "Sunnaas HF", bohfNames: ["Indre Oslo"] },
  { unitName: "St. Olavs HF", bohfNames: ["St. Olav"] },
  { unitName: "Vestre Viken HF", bohfNames: ["Vestre Viken"] },
  { unitName: "Lovisenberg diakonale sykehus AS", bohfNames: ["Indre Oslo"] },
  { unitName: "Diakonhjemmet sykehus AS", bohfNames: ["Indre Oslo"] },
  { unitName: "Akershus HF", bohfNames: ["Akershus"] },
  { unitName: "Innlandet HF", bohfNames: ["Innlandet"] },
  { unitName: "Østfold HF", bohfNames: ["Østfold"] },
  { unitName: "Stavanger HF", bohfNames: ["Stavanger"] },
  { unitName: "Fonna HF", bohfNames: ["Fonna"] },
  { unitName: "Bergen HF", bohfNames: ["Bergen"] },
  { unitName: "Førde HF", bohfNames: ["Førde"] },
  { unitName: "Nord-Trøndelag HF", bohfNames: ["Nord-Trøndelag"] },
  { unitName: "Sørlandet HF", bohfNames: ["Sørlandet"] },
  { unitName: "Vestfold HF", bohfNames: ["Vestfold"] },
  { unitName: "Telemark HF", bohfNames: ["Telemark"] },
  { unitName: "Haraldsplass diakonale sykehus AS", bohfNames: ["Bergen"] },
  { unitName: "OUS HF", bohfNames: ["OUS"] },
  { unitName: "Møre og Romsdal HF", bohfNames: ["Møre og Romsdal"] },
];

// Hospitals must be mapped back to HF
const hospital2HF = (
  treedata: TreeViewFilterSectionNode[],
  hospitalName: string,
) => {
  // Treedata initially has only "Nasjonalt"
  if (treedata.length === 1) {
    return "Nasjonalt";
  }

  // Flatten the tree and remove the rows that are undefined
  // "Nasjonalt" has no children and will be undefined
  const treatmentUnitsFlat = treedata
    .map((row) => row.children)
    .flat()
    .filter((row) => row);

  // Search the tree and locate the HF under which the hospital belongs
  // Return an array of objects with true/false values
  const searchTree = treatmentUnitsFlat.map((hf) => {
    const targetFound = hf.children.some((hospital) => {
      return hospital.nodeValue.value === hospitalName;
    });

    return { hfName: hf.nodeValue.value, targetFound: targetFound };
  });

  // Filter out the object with the true value
  const targetHF = searchTree.filter((row) => {
    return row.targetFound === true;
  });

  // If the unit passed to this function is not a hospital, return
  return targetHF[0] ? targetHF[0].hfName : "NA";
};

// Map short_name to bohf name
export const mapUnitName2BohfNames = (
  treedata: TreeViewFilterSectionNode[],
  unitName: string,
) => {
  let filteredMap = unitName2BohfNames.filter((obj) => {
    return obj.unitName === unitName;
  })[0];

  // Could be a hospital
  if (!filteredMap) {
    const hfName = hospital2HF(treedata, unitName);

    filteredMap = unitName2BohfNames.filter((obj) => {
      return obj.unitName === hfName;
    })[0];
  }

  // Could be a HF or RHF
  if (!filteredMap) {
    return null;
  }

  return filteredMap.bohfNames.map((bohfName) => {
    return ObjectIDToBoHF.filter((obj) => {
      return obj.bohf === bohfName;
    })[0].BoHF_num;
  });
};
