// Component for two chips with mutually exclusive choices.
// The component accepts a boolean state variable and a state setter.
// If the left chip is selected when the state is true, set trueChip=left, and vice versa.

import { Chip, Stack } from "@mui/material";
import { Hoverbox } from "qmongjs";

type ChipSelectionProps = {
  leftChipLabel: string;
  rightChipLabel: string;
  leftChipHelpText: string;
  rightChipHelpText: string;
  state: boolean;
  stateSetter: React.Dispatch<React.SetStateAction<boolean>>;
  trueChip: "left" | "right";
  hoverBoxOffset: number[];
  hoverBoxPlacement:
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "bottom-end"
    | "bottom-start"
    | "left-end"
    | "left-start"
    | "right-end"
    | "right-start"
    | "top-end"
    | "top-start";
  hoverBoxMaxWidth: number;
};

export const ChipSelection = (props: ChipSelectionProps) => {
  const {
    leftChipLabel,
    rightChipLabel,
    leftChipHelpText,
    rightChipHelpText,
    state,
    stateSetter,
    trueChip,
    hoverBoxOffset,
    hoverBoxPlacement,
    hoverBoxMaxWidth,
  } = props;

  let correctedState: boolean;

  if (trueChip === "left") {
    correctedState = !state;
  } else {
    correctedState = state;
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center" margin={4}>
      <Hoverbox
        title={leftChipHelpText}
        placement={hoverBoxPlacement}
        offset={hoverBoxOffset}
        maxWidth={hoverBoxMaxWidth}
      >
        <Chip
          label={leftChipLabel}
          color="primary"
          variant={correctedState ? "outlined" : "filled"}
          onClick={() => stateSetter(trueChip === "left" ? true : false)}
        />
      </Hoverbox>
      <Hoverbox
        title={rightChipHelpText}
        placement={hoverBoxPlacement}
        offset={hoverBoxOffset}
        maxWidth={hoverBoxMaxWidth}
      >
        <Chip
          label={rightChipLabel}
          color="primary"
          variant={correctedState ? "filled" : "outlined"}
          onClick={() => stateSetter(trueChip === "right" ? true : false)}
        />
      </Hoverbox>
    </Stack>
  );
};
