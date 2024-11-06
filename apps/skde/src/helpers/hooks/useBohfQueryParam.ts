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

/**
 * Returns a hook that toggles the given bohf in the query param `bohf` in the current router location.
 * The hook returns a tuple where the first element is the current set of selected bohfs and
 * the second element is a function to toggle a given bohf.
 *
 * The hook also handles the special case of the borhf parameter, which is a set of bohf
 * that are grouped together. If a borhf is selected, all the bohf in the group are selected.
 * If a bohf is deselected, all the bohf in the group are deselected.
 *
 * The hook also handles the special case of the national parameter, which is a bohf that is
 * not in any group. If the national parameter is set, the hook will not toggle any other bohf.
 *
 * The hook uses the `useRouter` hook from next/router to get the current router location.
 * The hook uses the `replace` method of the router to update the query param in the current
 * location.
 *
 * The hook is shallow, meaning it will not trigger a full page reload when the query param is
 * updated.
 *
 * @param {string} [national] - The national parameter, which is a bohf that is not in any group.
 * @returns {[Set<string>, (bohf: string) => void]} - A tuple where the first element is the current
 * set of selected bohfs and the second element is a function to toggle a given bohf.
 */
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
