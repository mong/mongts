import classNames from "./Buttons.module.css";

export const MenuButton = ({ lang }: { lang: "en" | "no" }) => {
  return (
    <button className={classNames.button} data-testid="menuButton">
      <span className={classNames.buttonBurgerIcon}>
        <span className="top"></span>
        <span className="middle"></span>
        <span className="bottom"></span>
      </span>
      <span className={classNames.buttonText}>
        {lang === "en" ? "MENU" : "MENY"}
      </span>
    </button>
  );
};
