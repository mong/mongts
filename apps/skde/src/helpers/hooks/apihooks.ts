import { useQuery } from "@tanstack/react-query";

const API_HOST =
  process.env.NEXT_PUBLIC_API_HOST ??
  (process.env.NODE_ENV === "production"
    ? "https://prod-api.skde.org"
    : "http://localhost:4000");

const RETRYABLE_STATUSES = new Set([429, 500, 502, 503, 504]);
const MAX_FETCH_ATTEMPTS = 3;
const REQUEST_TIMEOUT_MS = 15000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchJsonWithRetry = async (url: string) => {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_FETCH_ATTEMPTS; attempt++) {
    const abortController = new AbortController();
    const timeout = setTimeout(
      () => abortController.abort(),
      REQUEST_TIMEOUT_MS,
    );

    try {
      const response = await fetch(url, { signal: abortController.signal });

      if (response.ok) {
        clearTimeout(timeout);
        return await response.json();
      }

      clearTimeout(timeout);

      const shouldRetry =
        attempt < MAX_FETCH_ATTEMPTS && RETRYABLE_STATUSES.has(response.status);

      if (shouldRetry) {
        await sleep(300 * attempt);
        continue;
      }

      throw new Error(
        response.statusText || `Request failed with ${response.status}`,
      );
    } catch (error) {
      clearTimeout(timeout);
      lastError = error;

      if (error instanceof Error && error.name === "AbortError") {
        lastError = new Error("Request timed out");
      }

      if (attempt < MAX_FETCH_ATTEMPTS) {
        await sleep(300 * attempt);
      }
    }
  }

  if (lastError instanceof Error) {
    throw lastError;
  }

  throw new Error("Request failed");
};

export interface FetchIndicatorParams {
  registerShortName?: string;
  treatmentYear?: number;
  unitNames?: string[];
  unitLevel?: string;
  context?: string;
  language?: string;
  type?: string;
  id?: number;
  nested?: boolean;
  nordic?: boolean;
}

const indicatorUrl = (params: FetchIndicatorParams): string => {
  const registerShortNameQuery: string = params.registerShortName
    ? params.registerShortName
    : "all";

  const unitQuery: string = params.unitNames
    ? params.unitNames.reduce((acc, cur) => {
        return `${acc}unit_name[]=${cur}&`;
      }, "")
    : "";

  const unitLevelQuery: string = params.unitLevel
    ? `unit_level=${params.unitLevel}&`
    : "";

  const contextQuery: string = params.context
    ? `context=${params.context}&`
    : "";

  const languageQuery: string = params.language
    ? `language=${params.language}&`
    : "";

  const yearQuery: string = params.treatmentYear
    ? `year=${params.treatmentYear}&`
    : "";

  const nordicQuery: string = params.nordic ? "nordic=1&" : "";

  const idQuery: string = params.id ? `id=${params.id}&` : "";
  const typeQuery: string = params.type ? `type=${params.type}` : "";

  const structure: string = params.nested ? "/nestedData?" : "/indicators?";

  return `${API_HOST}/data/${registerShortNameQuery}${structure}${unitQuery}${unitLevelQuery}${yearQuery}${contextQuery}${languageQuery}${nordicQuery}${typeQuery}${idQuery}`;
};

const fetchIndicators = async (params: FetchIndicatorParams) => {
  return await fetchJsonWithRetry(indicatorUrl(params));
};

export const useIndicatorQuery = (params: FetchIndicatorParams) => {
  return useQuery({
    queryKey: ["indicatorQuery", params],
    queryFn: () => fetchIndicators(params),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 60,
  });
};

const unitNamesUrl = (
  registerShortName: string,
  context: string,
  type: string,
  nordic?: boolean,
): string => {
  const nordicQuery = nordic === undefined ? "" : `&nordic=${nordic ? 1 : 0}`;
  return `${API_HOST}/data/${registerShortName}/unitnames?context=${context}&type=${type}${nordicQuery}`;
};

const fetchUnitNames = async (
  registerShortName: string,
  context: string,
  type: string,
  nordic?: boolean,
) => {
  return await fetchJsonWithRetry(
    unitNamesUrl(registerShortName, context, type, nordic),
  );
};

export const useUnitNamesQuery = (
  registerShortName?: string,
  context?: string,
  type?: string,
  nordic?: boolean,
) => {
  const registerShortNameQuery: string = registerShortName
    ? registerShortName
    : "all";

  const contextQuery: string = context ? context : "caregiver";

  const typeQuery: string = type ? type : "ind";

  return useQuery({
    queryKey: ["unitNames", registerShortName, context, type, nordic],
    queryFn: () =>
      fetchUnitNames(registerShortNameQuery, contextQuery, typeQuery, nordic),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 60,
  });
};

const fetchRegisterNames = async () => {
  return await fetchJsonWithRetry(`${API_HOST}/info/names`);
};

export const useRegisterNamesQuery = () => {
  return useQuery({
    queryKey: [`registerNames`],
    queryFn: () => fetchRegisterNames(),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 60,
  });
};

const fetchUnitUrls = async () => {
  return await fetchJsonWithRetry(`${API_HOST}/info/url`);
};

export const useUnitUrlsQuery = () => {
  return useQuery({
    queryKey: ["unitUrls"],
    queryFn: () => fetchUnitUrls(),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 60,
  });
};

const fetchMedicalFields = async (nordicOnly?: boolean) => {
  const nordicQuery = nordicOnly ? "?nordic=1" : "";
  return await fetchJsonWithRetry(
    `${API_HOST}/info/medicalfields${nordicQuery}`,
  );
};

export const useMedicalFieldsQuery = (nordicOnly?: boolean) => {
  return useQuery({
    queryKey: ["medicalFields", nordicOnly],
    queryFn: () => fetchMedicalFields(nordicOnly),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 60,
  });
};

const fetchRegistryRanks = async (year?: number) => {
  const yearQuery: string = year ? `year=${year}&` : "";
  return await fetchJsonWithRetry(`${API_HOST}/data/registryRank?${yearQuery}`);
};

const fetchRegistryScores = async (year?: number) => {
  const yearQuery: string = year ? `year=${year}&` : "";
  return await fetchJsonWithRetry(
    `${API_HOST}/data/registryScores?${yearQuery}`,
  );
};

const fetchRegistryEvaluation = async (year?: number) => {
  const yearQuery: string = year ? `year=${year}&` : "";
  return await fetchJsonWithRetry(
    `${API_HOST}/data/registryEvaluation?${yearQuery}`,
  );
};

const fetchRegistryRequirements = async () => {
  return await fetchJsonWithRetry(`${API_HOST}/data/registryRequirements`);
};

export const useRegistryRankQuery = (year?: number) => {
  return useQuery({
    queryKey: ["registryRank", year],
    queryFn: () => fetchRegistryRanks(year),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 60,
  });
};

export const useRegistryEvaluationQuery = (year?: number) => {
  return useQuery({
    queryKey: ["registryEvaluation", year],
    queryFn: () => fetchRegistryEvaluation(year),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 60,
  });
};

export const useRegistryScoresQuery = (year?: number) => {
  return useQuery({
    queryKey: ["registryScores", year],
    queryFn: () => fetchRegistryScores(year),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 60,
  });
};

export const useRegistryRequirementsQuery = () => {
  return useQuery({
    queryKey: ["registryRequirements"],
    queryFn: () => fetchRegistryRequirements(),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 60,
  });
};
