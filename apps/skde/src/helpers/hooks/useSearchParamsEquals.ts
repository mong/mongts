import { useSearchParams } from "next/navigation";
import { hasSymmetricDifference } from "../functions/hasSymmetricDifference";
import { forEach } from "lodash";

/**
 * A hook that compares the query parameters with the values given as input.
 *
 * To be considered equal, the set of keys must be the same, excluding those
 * having null or undefined values, and also keys having non-null defined values
 * must match.
 *
 * @param {{ [key: string]: number | boolean | string | string[] | null | undefined }} inputValues The map with the values that must match the query params
 * @returns {boolean} true if equal
 */
export function useSearchParamsEquals(
  inputValues: {
    [key: string]: number | boolean | string | string[] | null | undefined;
  },
  defaultValues: { [key: string]: number | boolean | string | string[] } = {},
) {
  const searchParams = useSearchParams();
  const inputValueKeys = new Set<string>();
  const queryParamKeys = new Set<string>();

  Object.keys(inputValues).forEach((key) => {
    if (inputValues[key] !== null && inputValues[key] !== undefined) {
      inputValueKeys.add(key);
    }
  });

  Array.from(searchParams.keys()).forEach((key) => {
    const keyValue = searchParams.get(key);
    if (keyValue !== null && keyValue !== undefined) {
      queryParamKeys.add(key);
    }
  });

  removeMatchingDefaultValues(inputValues, defaultValues, queryParamKeys);

  // Check if the sets have different keys. The function
  // symmetricDifference is not yet widely supported in browsers, so we
  // have to implement it manually.
  if (hasSymmetricDifference(inputValueKeys, queryParamKeys)) {
    return false;
  }

  return compareValues(Array.from(inputValueKeys), inputValues, searchParams);
}

// Remove keys from inputValues that match their default values when not present in searchParams
export function removeMatchingDefaultValues(
  inputValues: {
    [key: string]: number | boolean | string | string[] | null | undefined;
  },
  defaultValues: { [key: string]: number | boolean | string | string[] },
  queryParamKeys: Set<string>,
) {
  forEach(defaultValues, (defaultVal, key) => {
    const inputValue = inputValues[key];
    if (!queryParamKeys.has(key)) {
      if (inputValue === null || inputValue === undefined) {
        delete inputValues[key];
      } else if (Array.isArray(defaultVal) && Array.isArray(inputValue)) {
        if (
          defaultVal.length === inputValue.length &&
          defaultVal.every((val, idx) => val === inputValue[idx])
        ) {
          delete inputValues[key];
        }
      } else if (inputValue === defaultVal) {
        delete inputValues[key];
      }
    }
  });
}

export function compareValues(
  keys: string[],
  inputValues: { [key: string]: number | boolean | string | string[] },
  searchParams: URLSearchParams,
): boolean {
  for (const key of keys) {
    const inputValue = inputValues[key];
    const inputValueType = typeof inputValue;
    const searchParamStr = searchParams.get(key);
    let parsedSearchParam: number | boolean | string | string[];

    switch (inputValueType) {
      case "string":
        parsedSearchParam = searchParamStr;
        break;
      case "number":
        parsedSearchParam = Number(searchParamStr);
        break;
      case "boolean":
        parsedSearchParam = searchParamStr === "true";
        break;
      default:
        if (Array.isArray(inputValue)) {
          parsedSearchParam = searchParamStr.split("_");
        } else {
          throw Error("Unsupported type of parameter");
        }
    }

    if (Array.isArray(inputValue)) {
      if (
        !Array.isArray(parsedSearchParam) ||
        parsedSearchParam.length !== inputValue.length ||
        !parsedSearchParam.every((val, idx) => val === inputValue[idx])
      ) {
        return false;
      }
    } else if (parsedSearchParam !== inputValue) {
      return false;
    }
  }
  return true;
}
