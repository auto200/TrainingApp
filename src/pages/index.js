import React from "react";
import SEO from "../components/seo";
import { ThemeProvider } from "styled-components";
import theme from "../utils/theme";
import Overview from "../components/Overview";
import BottomMenu from "../components/BottomMenu";
import ModalManager from "../components/Modals/ModalManager";

const IndexPage = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* providing theme here because gatsby fails to build when doing it in gatsby-ssr */}
      <>
        <SEO title="Home" />
        <ModalManager />
        <Overview />
        <BottomMenu />
      </>
    </ThemeProvider>
  );
};

export default IndexPage;
