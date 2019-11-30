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
  }
  *,*::before,*::after{
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
