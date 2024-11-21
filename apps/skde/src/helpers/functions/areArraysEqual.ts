export function areArraysEqual<T>(
  arr1: T[] | null | undefined,
  arr2: T[] | null | undefined,
): boolean {
  if (arr1 === arr2) return true; // Both are null or undefined
  if (!arr1 || !arr2) return false; // One is null/undefined, the other is not

  if (arr1.length !== arr2.length) {
    return false; // Arrays of different lengths cannot be equal
  }

  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();

  return sortedArr1.every((value, index) => value === sortedArr2[index]);
}
