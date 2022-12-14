import classNames from "./Buttons.module.css";

type MenuButtonProps = {
  lang: "en" | "no";
};

export const MenuButton: React.FC<MenuButtonProps> = ({ lang }) => {
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
