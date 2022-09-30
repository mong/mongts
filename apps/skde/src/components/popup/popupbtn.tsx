import classNames from "./popup.module.css";

type PopUpButtonProps = {
  btnComponent: () => React.ReactNode;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PopUpButton: React.FC<PopUpButtonProps> = ({
  btnComponent,
  active,
  setActive,
}) => {
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
