import React from "react";
import SEO from "../components/seo";
import Layout from "../components/layout";
import MenuContextProvider from "../contexts/MenuContext";
import Overview from "../components/Overview";

const IndexPage = () => {
  return (
    <MenuContextProvider>
      <Layout>
        <SEO title="Home" />
        <Overview />
      </Layout>
    </MenuContextProvider>
  );
};

export default IndexPage;
