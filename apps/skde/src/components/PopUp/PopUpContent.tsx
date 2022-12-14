import { AiOutlineClose } from "react-icons/ai";
import { useTransition, animated, easings } from "react-spring";

import { useKeys, useOnClickOutside } from "../../helpers/hooks";
import { useRouterEvent } from "../../helpers/hooks/useRouterEvent";
import classNames from "./PopUp.module.css";

type PopUpContentProps = {
  children: React.ReactNode;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  innerContentStyle?: React.CSSProperties;
};

export const PopUpContent: React.FC<PopUpContentProps> = ({
  children,
  active,
  setActive,
  innerContentStyle = {
    width: "100%",
    height: "100%",
    margin: "auto",
    padding: 0,
  },
}) => {
  const ref = useOnClickOutside<HTMLDivElement>(() => setActive(false), active);

  const transitions = useTransition(active, {
    from: { background: "rgba(172, 181, 189, 0)", transform: "scale(0.95)" },
    enter: { background: "rgba(172, 181, 189, 0.5)", transform: "scale(1)" },
    leave: { background: "rgba(172, 181, 189, 0)", transform: "scale(0.95)" },
    config: (it, ind, state) => ({
      easing: state === "leave" ? easings.easeInQuad : easings.easeOutQuad,
      duration: state === "leave" ? 75 : 100,
    }),
  });
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.defaultPrevented) return;
    setActive(false);
    event.preventDefault();
  };
  useKeys(["Escape", "Esc"], "keydown", handleKeyDown);
  useRouterEvent("routeChangeStart", () => setActive(false));
  return (
    <div>
      {transitions(
        (styles, item) =>
          item && (
            <animated.div
              className={classNames.popUpContentWrapper}
              style={{
                ...styles,
              }}
            >
              <div
                className={classNames.popUpContent}
                ref={ref}
                style={innerContentStyle}
                data-testid="popUpContent"
              >
                <button
                  className={classNames.closeBtn}
                  data-testid="closeBtn"
                  onClick={() => setActive(false)}
                >
                  <AiOutlineClose
                    strokeWidth={"1px"}
                    color="#034584"
                    style={{ alignSelf: "end" }}
                    size={30}
                  />
                </button>
                {children}
              </div>
            </animated.div>
          )
      )}
    </div>
  );
};
