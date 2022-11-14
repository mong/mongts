import { TuName, NestedTreatmentUnitName, OptsTu } from "types";

export const nestTuNames = (
  tu_names: TuName[],
  opts_tu: OptsTu[]
): NestedTreatmentUnitName[] => {
  const opts_rhf = opts_tu.filter((opts) => opts.label === "RHF")[0].options;

  const opts_hf = opts_tu.filter((opts) => opts.label === "HF")[0].options;
  const opts_hosp = opts_tu.filter((opts) => opts.label === "Sykehus")[0]
    .options;

  tu_names.sort((a, b) => {
    return a.hospital > b.hospital ? 1 : a.hospital < b.hospital ? -1 : 0;
  });
  tu_names.sort((a, b) => {
    return a.hf_full > b.hf_full ? 1 : a.hf_full < b.hf_full ? -1 : 0;
  });
  tu_names.sort((a, b) => {
    return a.rhf > b.rhf ? 1 : a.rhf < b.rhf ? -1 : 0;
  });

  const nested_tu_names = tu_names.reduce((acc, cur) => {
    if (acc.length === 0 || acc.every((tu_entry) => tu_entry.rhf !== cur.rhf)) {
      const entry = {
        rhf: cur.rhf,
        hf: [
          {
            hf: cur.hf,
            hf_full: cur.hf_full,
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
          hospital: [cur.hospital],
        };
        acc.filter((acc_data) => acc_data.rhf === cur.rhf)[0].hf.push(hf_entry);
      } else {
        acc
          .filter((acc_data) => acc_data.rhf === cur.rhf)[0]
          .hf.filter((hf) => hf.hf === cur.hf)[0]
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
