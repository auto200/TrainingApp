const React = require("react");
const GlobalStyle = require("./src/utils/GlobalStyle").default;
const SettingsContextProvider = require("./src/contexts/SettingsContext")
  .default;
const MaterialUiThemeProvider = require("./src/contexts/MaterialUiTheme")
  .default;

exports.wrapRootElement = ({ element }) => {
  return (
    <MaterialUiThemeProvider>
      <GlobalStyle />
      <SettingsContextProvider>{element}</SettingsContextProvider>;
    </MaterialUiThemeProvider>
  );
};
