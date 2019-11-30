import React from "react";
import SettingsContextProvider from "./src/contexts/SettingsContext";
import GlobalStyle from "./src/utils/GlobalStyle";
import MaterialUiThemeProvider from "./src/contexts/MaterialUiTheme";

export const wrapRootElement = ({ element }) => {
  return (
    <MaterialUiThemeProvider>
      <GlobalStyle />
      <SettingsContextProvider>{element}</SettingsContextProvider>
    </MaterialUiThemeProvider>
  );
};

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (typeof window.IntersectionObserver === `undefined`) {
    import(`intersection-observer`);
    console.log(`# IntersectionObserver is polyfilled!`);
  }
};
