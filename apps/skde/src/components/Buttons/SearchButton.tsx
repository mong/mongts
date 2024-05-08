import classNames from "./Buttons.module.css";

export const SearchButton = ({ lang }: { lang: "en" | "no" }) => {
  return (
    <button className={classNames.button}>
      <span className={classNames.buttonIconSearch}></span>
      <span className={classNames.buttonText}>
        {lang === "en" ? "Search" : "Søk"}
      </span>
    </button>
  );
};
