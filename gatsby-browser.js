import React from "react";
import SettingsContextProvider from "./src/contexts/SettingsContext";
import ExercisesProvider from "./src/contexts/ExercisesContext";
import MaterialUiThemeProvider from "./src/contexts/MaterialUiTheme";
import ModalProvider from "./src/contexts/ModalContext";
import Layout from "./src/components/Layout";

export const wrapRootElement = ({ element }) => {
  return (
    <MaterialUiThemeProvider>
      <SettingsContextProvider>
        <ExercisesProvider>
          <ModalProvider>{element}</ModalProvider>
        </ExercisesProvider>
      </SettingsContextProvider>
    </MaterialUiThemeProvider>
  );
};
export const wrapPageElement = ({ element, props }) => {
  return <Layout location={props.location}>{element}</Layout>;
};

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (typeof window.IntersectionObserver === `undefined`) {
    import(`intersection-observer`);
    console.log(`# IntersectionObserver is polyfilled!`);
  }
};
