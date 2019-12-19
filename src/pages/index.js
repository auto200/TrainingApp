import React from "react";
import SEO from "../components/seo";
import { ThemeProvider } from "styled-components";
import theme from "../utils/theme";
import Overview from "../components/Overview";
import BottomMenu from "../components/BottomMenu";
import ModalManager from "../components/Modals/ModalManager";

const IndexPage = () => {
  {
    /* providing theme on each page because for some reason gatsby fails to build when doing it in gatsby-ssr */
  }
  return (
    <ThemeProvider theme={theme}>
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
