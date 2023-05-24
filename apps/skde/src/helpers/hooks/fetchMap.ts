import { useQuery } from "@tanstack/react-query";

const fetchMap = async (filename: string) => {
  const response = await fetch(filename);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

export const useFetchMapQuery = (filename: string) => {
  return useQuery([`registerNames`], () => fetchMap(filename), {
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    cacheTime: 1000 * 60 * 60,
  });
};
