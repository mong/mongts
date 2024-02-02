import { styled } from "styled-components";

export const LinechartBackground = styled.rect`
  rx: ${(props) => props.theme?.lineChartBackground?.rx || 0};
  ry: ${(props) => props.theme?.lineChartBackground?.ry || 0};
  fill: ${(props) => props.theme?.lineChartBackground?.fill || "#ffffff"};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;
