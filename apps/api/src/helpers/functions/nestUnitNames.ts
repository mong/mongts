import { TuName, NestedTreatmentUnitName, OptsTu } from "types";

export const nestTuNames = (
  tu_names: TuName[],
  opts_tu: OptsTu[],
): NestedTreatmentUnitName[] => {
  const opts_rhf = opts_tu.find((opts) => opts.label === "RHF")!.options;

  const opts_hf = opts_tu.find((opts) => opts.label === "HF")!.options;
  const opts_hosp = opts_tu.find((opts) => opts.label === "Sykehus")!.options;

  tu_names.sort((a, b) =>
    a.hospital > b.hospital ? 1 : a.hospital < b.hospital ? -1 : 0,
  );
  tu_names.sort((a, b) =>
    a.hf_sort > b.hf_sort ? 1 : a.hf_sort < b.hf_sort ? -1 : 0,
  );
  tu_names.sort((a, b) =>
    a.rhf_sort > b.rhf_sort ? 1 : a.rhf_sort < b.rhf_sort ? -1 : 0,
  );

  const nested_tu_names = tu_names.reduce((acc, cur) => {
    if (acc.length === 0 || acc.every((tu_entry) => tu_entry.rhf !== cur.rhf)) {
      const entry = {
        rhf: cur.rhf,
        rhf_sort: cur.rhf_sort,
        rhf_shortest: cur.rhf_shortest,
        hf: [
          {
            hf: cur.hf,
            hf_full: cur.hf_full,
            hf_sort: cur.hf_sort,
            hf_shortest: cur.hf_shortest,
            hospital: [cur.hospital],
          },
        ],
      };
      acc = [...acc, entry];
    } else {
      const hf_names = acc
        .filter((acc_data) => acc_data.rhf === cur.rhf)
        .map((data) => data.hf)
        .map((data) => data.map((d) => d.hf))
        .flat();

      if (!hf_names.includes(cur.hf)) {
        const hf_entry = {
          hf: cur.hf,
          hf_full: cur.hf_full,
          hf_sort: cur.hf_sort,
          hf_shortest: cur.hf_shortest,
          hospital: [cur.hospital],
        };
        acc.find((acc_data) => acc_data.rhf === cur.rhf)!.hf.push(hf_entry);
      } else {
        acc
          .find((acc_data) => acc_data.rhf === cur.rhf)!
          .hf.find((hf) => hf.hf === cur.hf)!
          .hospital.push(cur.hospital);
      }
    }
    return acc;
  }, [] as NestedTreatmentUnitName[]);

  if (opts_tu) {
    for (let iRhf = nested_tu_names.length - 1; iRhf > -1; iRhf--) {
      if (opts_rhf.every((rhf) => rhf.value !== nested_tu_names[iRhf].rhf)) {
        nested_tu_names.splice(iRhf, 1);
      }

      const hfArray = nested_tu_names[iRhf] ? nested_tu_names[iRhf].hf : [];
      for (let iHf = hfArray.length - 1; iHf > -1; iHf--) {
        if (opts_hf.every((hf) => hf.value !== hfArray[iHf].hf)) {
          hfArray.splice(iHf, 1);
        }

        const hospArray = hfArray[iHf] ? hfArray[iHf].hospital : [];
        for (let iHosp = hospArray.length - 1; iHosp > -1; iHosp--) {
          if (opts_hosp.every((hosp) => hosp.value !== hospArray[iHosp])) {
            hospArray.splice(iHosp, 1);
          }
        }
      }
    }
  }

  return nested_tu_names;
};
