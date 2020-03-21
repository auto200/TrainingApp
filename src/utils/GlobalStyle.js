import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html{
    background-color: #34495e;
    color: white;
    user-select:none;
  }
  body,html{
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
  *,*::before,*::after{
    box-sizing: border-box;
  }
  /* fix for tooltip overflowing select list */
  div.MuiTooltip-popper{
    z-index:150;
  }
`;

export default GlobalStyle;
