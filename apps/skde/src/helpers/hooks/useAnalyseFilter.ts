import { useRouter } from "next/router";

export const useAnalyseFilter = (): [Set<string>, (tag: string) => void] => {
  const router = useRouter();
  const tags = [router.query.tags].flat().filter(Boolean);

  function toggleTag(tag: string) {
    router.replace(
      {
        query: {
          ...router.query,
          tags: tags.includes(tag)
            ? tags.filter((d) => d != tag)
            : tags.concat(tag),
        },
      },
      undefined,
      { shallow: true },
    );
  }
  return [new Set(tags), toggleTag];
};
