import React from "react";
import { useIsomorphicLayoutEffect } from "../../helpers/hooks";

import { PopUpButton } from "./popupbtn";
import { PopUpContent } from "./popupcontent";

type PopUpProps = {
  btnComponent: () => React.ReactNode;
  children: React.ReactNode;
  innerContentStyle?: React.CSSProperties;
  popupState?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PopUp = ({
  children,
  btnComponent,
  innerContentStyle,
  popupState,
}: PopUpProps) => {
  const [active, setActive] = React.useState<boolean>(false);

  useIsomorphicLayoutEffect(() => {
    if (popupState) {
      popupState(active);
    }
  }, [active]);
  return (
    <div>
      <PopUpButton
        btnComponent={btnComponent}
        active={active}
        setActive={setActive}
      />
      {active && (
        <PopUpContent
          active={active}
          setActive={setActive}
          innerContentStyle={innerContentStyle}
        >
          {children}
        </PopUpContent>
      )}
    </div>
  );
};
