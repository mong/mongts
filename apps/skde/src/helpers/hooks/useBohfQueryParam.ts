import { useRouter } from "next/router";

const borhf = {
  "Helse Sør-Øst": [
    "Akershus",
    "OUS",
    "Vestfold",
    "Vestre Viken",
    "Sørlandet",
    "Telemark",
    "Innlandet",
    "Østfold",
    "Diakonhjemmet",
    "Lovisenberg",
  ],
  "Helse Vest": ["Førde", "Bergen", "Fonna", "Stavanger"],
  "Helse Midt-Norge": ["St. Olav", "Møre og Romsdal", "Nord-Trøndelag"],
  "Helse Nord": ["Finnmark", "UNN", "Nordland", "Helgeland"],
};
const borhfSet = new Set(Object.keys(borhf));

export const useBohfQueryParam = (
  national: string = "",
): [Set<string>, (bohf: string) => void] => {
  const router = useRouter();
  const selectedBohfs = [router.query.bohf].flat().filter(Boolean);

  function toggleBohf(bohf: string) {
    if (bohf && bohf != national) {
      const newSelection = new Set(selectedBohfs);

      if (newSelection.has(bohf)) {
        newSelection.delete(bohf);
        if (borhfSet.has(bohf)) {
          for (const b of borhf[bohf]) {
            newSelection.delete(b);
          }
        }
      } else {
        newSelection.add(bohf);
        if (borhfSet.has(bohf)) {
          for (const b of borhf[bohf]) {
            newSelection.add(b);
          }
        }
      }

      for (const [rhf, bohfs] of Object.entries(borhf)) {
        newSelection.delete(rhf);
        if (bohfs.every((bohf) => newSelection.has(bohf)))
          newSelection.add(rhf);
      }

      router.replace(
        {
          query: {
            ...router.query,
            bohf: Array.from(newSelection),
          },
        },
        undefined,
        { shallow: true },
      );
    }
  }
  return [new Set(selectedBohfs), toggleBohf];
};
