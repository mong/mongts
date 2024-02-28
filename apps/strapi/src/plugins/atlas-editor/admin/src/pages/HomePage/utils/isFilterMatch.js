const isFilterMatch = (filter, atlas) => {
  if (filter.search.length > 0) {
    const searchWords = filter.search.trim().toLowerCase().split(" ");
    return searchWords.every(
      (word) =>
        atlas.shortTitle.toLowerCase().includes(word) ||
        atlas.mainTitle.toLowerCase().includes(word),
    );
  }
  return true;
};

export default isFilterMatch;
