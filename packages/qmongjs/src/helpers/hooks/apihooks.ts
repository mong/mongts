import { useQuery } from "@tanstack/react-query";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST ?? "http://localhost:4000"; //"https://test-api.skde.org";

interface FetchDescriptionParams {
  registerShortName: string;
  type?: "ind" | "dg";
}

const descriptionUrl = (params: FetchDescriptionParams): string => {
  const typeQuery: string = params.type ? `?type=${params.type}` : "";
  return `${API_HOST}/data/${params.registerShortName}/descriptions${typeQuery}`;
};

const fetchDescription = async (params: FetchDescriptionParams) => {
  const response = await fetch(descriptionUrl(params));
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
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
  const response = await fetch(indicatorUrl(params));
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
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
  const response = await fetch(
    selectionYearsUrl(registerShortName, context, type),
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
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
  const response = await fetch(unitNamesUrl(registerShortName, context, type));
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

export const useUnitNamesQuery = (
  registerShortName: string,
  context: string,
  type: string,
) => {
  return useQuery({
    queryKey: ["unitNames", registerShortName, context, type],
    queryFn: () => fetchUnitNames(registerShortName, context, type),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 60,
  });
};

export const fetchRegisterNames = async () => {
  const response = await fetch(`${API_HOST}/info/names`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
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
  const response = await fetch(`${API_HOST}/info/url`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
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
  const response = await fetch(`${API_HOST}/info/medicalfields`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
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

  const response = await fetch(`${API_HOST}/data/registryRank?${yearQuery}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

const fetchRegistryScores = async (year?: number) => {
  const yearQuery: string = year ? `year=${year}&` : "";

  const response = await fetch(`${API_HOST}/data/registryScores?${yearQuery}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

const fetchRegistryEvaluation = async (year?: number) => {
  const yearQuery: string = year ? `year=${year}&` : "";

  const response = await fetch(
    `${API_HOST}/data/registryEvaluation?${yearQuery}`,
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

const fetchRegistryRequirements = async () => {
  const response = await fetch(`${API_HOST}/data/registryRequirements`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

const fetchResidentData = async (registry?: string) => {
  const registryQuery: string = registry ? `registry=${registry}&` : "";

  const response = await fetch(
    `${API_HOST}/info/residentData?${registryQuery}`,
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
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
