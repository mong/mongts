import { stack } from "d3-shape";
import { DataItemPoint } from "../../types";

export const toBarchart = (data: DataItemPoint[], dataKeys: string[]) => {
  const stackGen = stack().keys(dataKeys);
  const stackData = stackGen(data as { [k: string]: number }[]).map(
    (d) => (d.forEach((v) => (v["key"] = d.key)), d),
  );

  return stackData;
};

/**
 * Returns a comparator function for sorting an array of objects based on a specified key.
 *
 * @param order - The order of sorting: "asc" for ascending or "desc" for descending.
 * @param orderBy - The key of the object by which to sort.
 * @param varType - The type of the variable used for comparison, either string or number.
 * @returns A comparator function that can be used to sort an array of objects.
 */
export function getOrderComparator<
  D extends { [n: string]: string | number },
  K extends string & keyof D,
>(order: "asc" | "desc", orderBy: K, varType: D[K]) {
  return order === "desc"
    ? (a: D, b: D) => sortDesc<D, K>(a, b, orderBy, varType)
    : (a: D, b: D) => -sortDesc<D, K>(a, b, orderBy, varType);
}

function sortDesc<
  Data extends { [n: string]: string | number },
  K extends string & keyof Data,
>(a: Data, b: Data, orderBy: K, varType: Data[K]) {
  if (varType === "number") {
    if (parseFloat(b[orderBy].toString()) < parseFloat(a[orderBy].toString())) {
      return -1;
    }
    if (parseFloat(b[orderBy].toString()) > parseFloat(a[orderBy].toString())) {
      return 1;
    }
    return 0;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
