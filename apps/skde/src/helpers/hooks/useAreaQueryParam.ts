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
 * Returns a hook that toggles the given area in the query param `area` in the current router location.
 * The hook returns a tuple where the first element is the current set of selected areas and
 * the second element is a function to toggle a given area.
 *
 * The hook also handles the special case of the borhf parameter, which is a set of area
 * that are grouped together. If a borhf is selected, all the area in the group are selected.
 * If a area is deselected, all the area in the group are deselected.
 *
 * The hook also handles the special case of the national parameter, which is a area that is
 * not in any group. If the national parameter is set, the hook will not toggle any other area.
 *
 * The hook uses the `useRouter` hook from next/router to get the current router location.
 * The hook uses the `replace` method of the router to update the query param in the current
 * location.
 *
 * The hook is shallow, meaning it will not trigger a full page reload when the query param is
 * updated.
 *
 * @param {string} [national] - The national parameter, which is a area that is not in any group.
 * @returns {[Set<string>, (area: string) => void]} - A tuple where the first element is the current
 * set of selected areas and the second element is a function to toggle a given area.
 */
export const useAreaQueryParam = (
  national: string = "",
  type: string = "area",
): [Set<string>, (area: string) => void] => {
  const router = useRouter();
  const selectedAreas = [router.query[type]].flat().filter(Boolean);

  function toggleArea(area: string) {
    if (area && area != national) {
      const newSelection = new Set(selectedAreas);

      if (newSelection.has(area)) {
        newSelection.delete(area);
        if (borhfSet.has(area)) {
          for (const b of borhf[area]) {
            newSelection.delete(b);
          }
        }
      } else {
        newSelection.add(area);
        if (borhfSet.has(area)) {
          for (const b of borhf[area]) {
            newSelection.add(b);
          }
        }
      }

      for (const [rhf, bohfs] of Object.entries(borhf)) {
        newSelection.delete(rhf);
        if (bohfs.every((area) => newSelection.has(area)))
          newSelection.add(rhf);
      }

      router.replace(
        {
          query: {
            ...router.query,
            [type]: Array.from(newSelection),
          },
        },
        undefined,
        { shallow: true },
      );
    }
  }
  return [new Set(selectedAreas), toggleArea];
};
