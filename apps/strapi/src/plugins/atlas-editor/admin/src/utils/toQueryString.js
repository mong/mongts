const toQueryStringArray = (key, value) => {
  return Array.isArray(value)
    ? value
        .map(
          (v, i) => `${encodeURIComponent(key)}[${i}]=${encodeURIComponent(v)}`,
        )
        .join("&")
    : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
};

const toQueryString = (query) => {
  return Object.keys(query)
    .map((key) => toQueryStringArray(key, query[key]))
    .join("&");
};

export { toQueryStringArray };
export default toQueryString;
