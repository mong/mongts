import { useQuery } from "@tanstack/react-query";

/**
 * Fetches a map from a json file.
 *
 * @param filename The filename of the json file containing the map.
 * @returns A useQuery hook that fetches the map from the given filename.
 *
 * The map is cached for a year, and refetched on window focus.
 */
export const FetchMap = (filename: string) => {
  const fetching = async (filename) => {
    const response = await fetch(filename);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  };
  return useQuery({
    queryKey: [`map_${filename}`],
    queryFn: () => fetching(filename),
    staleTime: 1000 * 60 * 60 * 24 * 365,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 60 * 24 * 365,
  });
};
