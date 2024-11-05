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

/**
 * Component for two chips with mutually exclusive choices.
 *
 * The component accepts a boolean state variable and a state setter.
 * If the left chip is selected when the state is true, set trueChip=left, and vice versa.
 *
 * The component wraps each chip in a Hoverbox, which displays
 * the corresponding help text when hovered over.
 *
 * @param props ChipSelectionProps, with the following properties:
 *   - leftChipLabel: The label for the left chip.
 *   - rightChipLabel: The label for the right chip.
 *   - leftChipHelpText: The help text for the left chip.
 *   - rightChipHelpText: The help text for the right chip.
 *   - state: The boolean state variable.
 *   - stateSetter: The state setter.
 *   - trueChip: A string indicating whether the left chip is selected
 *     when the state is true.
 *   - hoverBoxOffset: An array of two numbers indicating the x and y offset
 *     of the hoverbox.
 *   - hoverBoxPlacement: A string indicating the placement of the hoverbox.
 *   - hoverBoxMaxWidth: The maximum width of the hoverbox.
 */
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
