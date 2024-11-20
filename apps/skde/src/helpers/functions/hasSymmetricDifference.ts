/**
 * Returns true if there are elements in either set that are not present in the other set.
 * Returns false if both sets contain exactly the same elements.
 *
 * This is equivalent to checking if Set.symmetricDifference() would return a non-empty set,
 * but implemented manually since symmetricDifference is not yet widely supported in browsers
 * at the time of writing.
 */
export function hasSymmetricDifference(
  setA: Set<string>,
  setB: Set<string>,
): boolean {
  return (
    Array.from(setA).filter((x) => !setB.has(x)).length +
      Array.from(setB).filter((x) => !setA.has(x)).length !==
    0
  );
}
