import toQueryString, { toQueryStringArray } from "../toQueryString";

test("toQueryString is given an object with an array property and one string property, resulting keys and values are all present", () => {
  const res = toQueryString({ id: 1, values: ["a", "b"] });
  expect(res).toBe("id=1&values[0]=a&values[1]=b");
});

test("toQueryStringArray is given non-array property, resulting key name is without brackets", () => {
  const res = toQueryStringArray("key", "value");

  expect(res).toBe("key=value");
});

test("toQueryStringArray is given array property, resulting key names have indices in brackets", () => {
  const res = toQueryStringArray("key", ["first", "second"]);

  expect(res).toBe("key[0]=first&key[1]=second");
});

test("toQueryStringArray is given key and value with special chars, resulting key and value are URL encoded", () => {
  const res = toQueryStringArray("kæy", "værdi");
  expect(res).toBe("k%C3%A6y=v%C3%A6rdi");
});

test("toQueryStringArray is given key and several values with special chars, resulting keys and values are URL encoded", () => {
  const res = toQueryStringArray("kæy", ["værdi", "v&rdi2"]);
  expect(res).toBe("k%C3%A6y[0]=v%C3%A6rdi&k%C3%A6y[1]=v%26rdi2");
});

test("toQueryStringArray is given key and several values with special chars, resulting keys and values are URL encoded", () => {
  const res = toQueryStringArray("kæy", ["værdi", "v&rdi2"]);
  expect(res).toBe("k%C3%A6y[0]=v%C3%A6rdi&k%C3%A6y[1]=v%26rdi2");
});
