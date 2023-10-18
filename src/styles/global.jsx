import { Global as GlobalStyling, css } from "@emotion/react";

import reset from "./reset";
import { typography } from "./theme";

const Global = () => (
  <GlobalStyling
    styles={css`
      @import url("https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&display=swap");
      ${reset}

      * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      body {
        height: 100%;
        color: ${typography.defaultColor};
        font-family: ${typography.fonts};
        font-weight: 400;
        letter-spacing: ${typography.letterSpacing.regular};
      }
    `}
  />
);

export default Global;
