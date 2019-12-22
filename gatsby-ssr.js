const React = require("react");
const SettingsContextProvider = require("./src/contexts/SettingsContext")
  .default;
const MaterialUiThemeProvider = require("./src/contexts/MaterialUiTheme")
  .default;
const ModalProvider = require("./src/contexts/ModalContext").default;
const Layout = require("./src/components/Layout").default;

exports.wrapRootElement = ({ element }) => {
  return (
    <MaterialUiThemeProvider>
      <SettingsContextProvider>
        <ModalProvider>{element}</ModalProvider>
      </SettingsContextProvider>
    </MaterialUiThemeProvider>
  );
};

exports.wrapPageElement = ({ element, props }) => {
  return <Layout location={props.location}>{element}</Layout>;
};
