import React from "react";
import SEO from "../components/seo";
import Overview from "../components/Overview";
import ModalManager from "../components/Modals/ModalManager";

const IndexPage = () => {
  return (
    <>
      <SEO title="Home" />
      <ModalManager />
      <Overview />
    </>
  );
};

export default IndexPage;
