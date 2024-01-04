import { useQuery } from "@tanstack/react-query";

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
    cacheTime: 1000 * 60 * 60 * 24 * 365,
  });
};
