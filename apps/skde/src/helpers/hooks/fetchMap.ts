import { useQuery } from "@tanstack/react-query";

export const FetchMap = (filename: string) => {
  const fetching = async (filename) => {
    const response = await fetch(filename);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  };
  return useQuery([`registerNames`], () => fetching(filename), {
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    cacheTime: 1000 * 60 * 60,
  });
};
