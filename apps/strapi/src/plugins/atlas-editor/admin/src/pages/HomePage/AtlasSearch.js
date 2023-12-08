import React, { useState, useContext } from "react";
import { Searchbar, SearchForm } from "@strapi/design-system";
import HomePageStringsContext from "./HomePageStringsContext";

const AtlasSearch = ({ setSearchString }) => {
  const strings = useContext(HomePageStringsContext);
  const [value, setValue] = useState("");

  const handleClear = () => {
    setValue("");
    setSearchString("");
  };

  return (
    <SearchForm
      onSubmit={(e) => {
        e.preventDefault();
        setSearchString(value);
      }}
    >
      <Searchbar
        name="search"
        placeholder={strings.search}
        aria-label={strings.search}
        onChange={(e) => setValue(e.target.value)}
        clearLabel={strings.clearLabel}
        onClear={handleClear}
        value={value}
        size="S"
      />
    </SearchForm>
  );
};

export default AtlasSearch;
