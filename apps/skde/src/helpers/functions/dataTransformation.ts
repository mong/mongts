import { stack } from "d3-shape";

type InputData<D, K extends (string & keyof D)[]> = {
  [k in keyof D & keyof K]: number;
} & {
  [key in keyof D]: number | string;
};

export const toBarchart = <Data, Keys extends (string & keyof Data)[]>(
  data: InputData<Data, Keys>[],
  dataKeys: Keys,
) => {
  const stackGen = stack().keys(dataKeys);
  const stackData = stackGen(data).map(
    (d) => (d.forEach((v) => (v["key"] = d.key)), d),
  );

  return stackData;
};

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
