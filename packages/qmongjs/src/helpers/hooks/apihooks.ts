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

interface FetchDescriptionParams {
  registerShortName: string;
  type?: "ind" | "dg";
}

const descriptionUrl = (params: FetchDescriptionParams): string => {
  const typeQuery: string = params.type ? `?type=${params.type}` : "";
  return `${API_HOST}/data/${params.registerShortName}/descriptions${typeQuery}`;
};

const fetchDescription = async (params: FetchDescriptionParams) => {
  return await fetchJsonWithRetry(descriptionUrl(params));
};

export const useDescriptionQuery = (params: FetchDescriptionParams) => {
  return useQuery({
    queryKey: ["descriptions", params.registerShortName],
    queryFn: () => fetchDescription(params),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 60,
  });
};

export interface FetchIndicatorParams {
  registerShortName?: string;
  treatmentYear?: number;
  unitNames?: string[];
  unitLevel?: string;
  context?: string;
  type?: string;
  id?: number;
  nested?: boolean;
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

  const yearQuery: string = params.treatmentYear
    ? `year=${params.treatmentYear}&`
    : "";

  const idQuery: string = params.id ? `id=${params.id}&` : "";
  const typeQuery: string = params.type ? `type=${params.type}` : "";

  const structure: string = params.nested ? "/nestedData?" : "/indicators?";

  return `${API_HOST}/data/${registerShortNameQuery}${structure}${unitQuery}${unitLevelQuery}${yearQuery}${contextQuery}${typeQuery}${idQuery}`;
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

const selectionYearsUrl = (
  registerShortName: string,
  context: string,
  type: string,
): string => {
  return `${API_HOST}/data/${registerShortName}/years?context=${context}&type=${type}`;
};

const fetchSelectionYears = async (
  registerShortName: string,
  context: string,
  type: string,
) => {
  return await fetchJsonWithRetry(
    selectionYearsUrl(registerShortName, context, type),
  );
};

export const useSelectionYearsQuery = (
  registerShortName: string,
  context: string,
  type: string,
) => {
  return useQuery({
    queryKey: ["selectionYears", registerShortName, context, type],
    queryFn: () => fetchSelectionYears(registerShortName, context, type),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 60,
  });
};

const unitNamesUrl = (
  registerShortName: string,
  context: string,
  type: string,
): string => {
  return `${API_HOST}/data/${registerShortName}/unitnames?context=${context}&type=${type}`;
};

const fetchUnitNames = async (
  registerShortName: string,
  context: string,
  type: string,
) => {
  return await fetchJsonWithRetry(
    unitNamesUrl(registerShortName, context, type),
  );
};

export const useUnitNamesQuery = (
  registerShortName?: string,
  context?: string,
  type?: string,
) => {
  const registerShortNameQuery: string = registerShortName
    ? registerShortName
    : "all";

  const contextQuery: string = context ? context : "caregiver";

  const typeQuery: string = type ? type : "ind";

  return useQuery({
    queryKey: ["unitNames", registerShortName, context, type],
    queryFn: () =>
      fetchUnitNames(registerShortNameQuery, contextQuery, typeQuery),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 60,
  });
};

export const fetchRegisterNames = async () => {
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

const fetchMedicalFields = async () => {
  return await fetchJsonWithRetry(`${API_HOST}/info/medicalfields`);
};

export const useMedicalFieldsQuery = () => {
  return useQuery({
    queryKey: [`medicalFields`],
    queryFn: () => fetchMedicalFields(),
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

const fetchResidentData = async (registry?: string) => {
  const registryQuery: string = registry ? `registry=${registry}&` : "";
  return await fetchJsonWithRetry(
    `${API_HOST}/info/residentData?${registryQuery}`,
  );
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

export const useResidentDataQuery = (registry?: string) => {
  return useQuery({
    queryKey: ["residentData", registry],
    queryFn: () => fetchResidentData(registry),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 60,
  });
};
