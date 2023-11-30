import { styled } from "styled-components";

export const LinechartBackground = styled.rect`
  rx: 0;
  ry: 0;
  fill: #ffffff;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;
