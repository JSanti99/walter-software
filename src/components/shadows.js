import { css } from "styled-components";
const shadows = [
  `0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)`,
  `0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)`,
  `0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)`,
  `0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)`,
  `0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22)`,
];

export const materialShadow = {
  base: css`
    box-shadow: ${(props) => shadows[props.shadowDepth - 1 || 0]};
  `,
  hover: css`
    box-shadow: ${(props) =>
      shadows[props.shadowHoverDepth - 1 || props.shadowDepth + 1 || 4]};
  `,
};
