import { styled } from 'styled-components';

export const LinechartBackground = styled.rect`
  rx: 14;
  ry: 14;
  fill: #efefef;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;
