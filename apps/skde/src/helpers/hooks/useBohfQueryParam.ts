import { useRouter } from "next/router";

export const useBohfQueryParam = (
  national: string = "",
): [Set<string>, (bohf: string) => void] => {
  const router = useRouter();
  const selectedBohfs = [router.query.bohf].flat().filter(Boolean);
  function toggleBohf(bohf: string) {
    if (bohf && bohf != national) {
      router.replace(
        {
          query: {
            ...router.query,
            bohf: selectedBohfs.includes(bohf)
              ? selectedBohfs.filter((d) => d != bohf)
              : selectedBohfs.concat(bohf),
          },
        },
        undefined,
        { shallow: true },
      );
    }
  }
  return [new Set(selectedBohfs), toggleBohf];
};
