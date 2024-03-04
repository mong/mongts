const toQueryStringArray = (key: string, value: any) => {
  return Array.isArray(value)
    ? value
        .map(
          (v, i) => `${encodeURIComponent(key)}[${i}]=${encodeURIComponent(v)}`,
        )
        .join("&")
    : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
};

const toQueryString = (query: { [key: string]: any }) => {
  return Object.keys(query)
    .map((key: string) => toQueryStringArray(key, query[key]))
    .join("&");
};

export { toQueryStringArray };
export default toQueryString;
