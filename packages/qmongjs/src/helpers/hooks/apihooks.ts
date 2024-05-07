import { useQuery } from "@tanstack/react-query";
import { API_HOST } from "../../components/RegisterPage";
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
  return `${API_HOST}/data/${registerShortNameQuery}/indicators?${unitQuery}${unitLevelQuery}${yearQuery}${contextQuery}${typeQuery}${idQuery}`;
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
