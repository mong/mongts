import classNames from "./PopUp.module.css";

type PopUpButtonProps = {
  btnComponent: () => React.ReactNode;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PopUpButton = ({
  btnComponent,
  active,
  setActive,
}: PopUpButtonProps) => {
  return (
    <div
      className={classNames.popUpBtn}
      onClick={() => {
        setActive(!active);
      }}
    >
      {btnComponent()}
    </div>
  );
};
