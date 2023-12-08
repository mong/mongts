import isFilterMatch from "../utils/isFilterMatch";

// Test case 1: Filter search is empty, should return true
test("Empty filter search should return true", () => {
  const filter = { search: "" };
  const atlas = {
    shortTitle: "Example Atlas",
    mainTitle: "Example Main Title",
  };
  expect(isFilterMatch(filter, atlas)).toBe(true);
});

// Test case 2: Filter search matches atlas short title, should return true
test("Filter search matches atlas short title should return true", () => {
  const filter = { search: "Short" };
  const atlas = {
    shortTitle: "Example Short Title Atlas",
    mainTitle: "Example Main Title",
  };
  expect(isFilterMatch(filter, atlas)).toBe(true);
});

// Test case 3: Filter search matches atlas main title, should return true
test("Filter search matches atlas main title should return true", () => {
  const filter = { search: "Main" };
  const atlas = {
    shortTitle: "Example Atlas",
    mainTitle: "Example Main Title",
  };
  expect(isFilterMatch(filter, atlas)).toBe(true);
});

// Test case 4: Filter search does not match atlas titles, should return false
test("Filter search does not match atlas titles should return false", () => {
  const filter = { search: "Invalid" };
  const atlas = {
    shortTitle: "Example Atlas",
    mainTitle: "Example Main Title",
  };
  expect(isFilterMatch(filter, atlas)).toBe(false);
});

// Test case 5: Filter search matches both atlas titles, should return true
test("Filter search matches both atlas titles should return true", () => {
  const filter = { search: "Example" };
  const atlas = {
    shortTitle: "Example Atlas",
    mainTitle: "Example Main Title",
  };
  expect(isFilterMatch(filter, atlas)).toBe(true);
});

// Test case 6: All filter search words matche words in short and main titles, should return true
test("Filter search does not match all words in either atlas short or main titles should return false", () => {
  const filter = { search: "Example Atlas X" };
  const atlas = {
    shortTitle: "Example Atlas",
    mainTitle: "Example Main Title X",
  };
  expect(isFilterMatch(filter, atlas)).toBe(true);
});

// Test case 7: A filter search word does not match any words in short and main titles, should return false
test("Filter search does not match all words in either atlas short or main titles should return false", () => {
  const filter = { search: "One Two Three" };
  const atlas = {
    shortTitle: "One Short Title",
    mainTitle: "Main Title Three",
  };
  expect(isFilterMatch(filter, atlas)).toBe(false);
});

// Test case 8: Filter search with adjecent whitespaces does not affect result, should return true
test("Filter search matches all words in either short or main title should return true", () => {
  const filter = { search: "  Example  Atlas X" };
  const atlas = { shortTitle: "Short Title", mainTitle: "Example Atlas X" };
  expect(isFilterMatch(filter, atlas)).toBe(true);
});

// Test case 9: Filter search with wrong casing does not affect result, should return true
test("Filter search matches all words in either short or main title should return true", () => {
  const filter = { search: "short x" };
  const atlas = { shortTitle: "Short Title", mainTitle: "Example Atlas X" };
  expect(isFilterMatch(filter, atlas)).toBe(true);
});
