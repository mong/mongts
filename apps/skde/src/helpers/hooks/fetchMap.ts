import { useQuery } from "@tanstack/react-query";

export const FetchMap = (filename: string) => {
  const fetching = async (filename) => {
    const response = await fetch(filename);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  };
  return useQuery([`map_${filename}`], () => fetching(filename), {
    staleTime: 1000 * 60 * 60 * 24 * 365,
    refetchOnWindowFocus: false,
    cacheTime: 1000 * 60 * 60 * 24 * 365,
  });
};
