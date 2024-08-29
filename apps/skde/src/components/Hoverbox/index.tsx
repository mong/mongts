import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material";

type HoverboxProps = {
  title: string;
  placement: TooltipProps["placement"];
  offset: number[];
  maxWidth?: number;
  children: TooltipProps["children"];
};

export const Hoverbox = (props: HoverboxProps) => {
  const { title, placement, offset, maxWidth } = props;

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: maxWidth ? maxWidth : 220,
      fontSize: theme.typography.pxToRem(14),
      border: "1px solid #dadde9",
      borderRadius: "12px",
    },
  }));

  const tooltipSlotProps = {
    popper: {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: offset,
          },
        },
      ],
    },
  };

  return (
    <HtmlTooltip
      title={title}
      placement={placement}
      slotProps={tooltipSlotProps}
    >
      {props.children}
    </HtmlTooltip>
  );
};
