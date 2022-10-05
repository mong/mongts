import classNames from "./Buttons.module.css";

type SearchButtonProps = {
  lang: "en" | "no";
};

export const SearchButton: React.FC<SearchButtonProps> = ({ lang }) => {
  return (
    <button className={classNames.button}>
      <span className={classNames.buttonIconSearch}></span>
      <span className={classNames.buttonText}>
        {lang === "en" ? "Search" : "Søk"}
      </span>
    </button>
  );
};
