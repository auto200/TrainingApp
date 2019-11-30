import React, { useState, useContext } from "react";
import SEO from "../components/seo";
import Layout from "../components/layout";
import styled from "styled-components";
import MenuContextProvider from "../contexts/MenuContext";
import TrainingStarted from "../components/TrainingStarted";
import { SettingsContext } from "../contexts/SettingsContext";
import { training } from "../translations";
import BackgroundImage from "gatsby-background-image";
import { useStaticQuery, graphql } from "gatsby";
import { menuHeight } from "../utils/constants";

const StyledWrapper = styled(BackgroundImage)`
  height: calc(100vh - ${menuHeight});
`;
const TapToStart = styled.div`
  padding: 7px;
  transform: translateY(15px) translateX(10px);
  text-align: left;
  background-color: rgba(0, 0, 0, 0.8);
  font-weight: bold;
  font-size: 1.7rem;
  max-width: 250px;
  color: rgba(255, 250, 215, 0.75);
`;

const TrainingPage = () => {
  const data = useStaticQuery(graphql`
    query {
      bg: file(relativePath: { eq: "training_bg.jpg" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1600) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  const [isTraining, setIsTraining] = useState(false);
  const {
    settings: { currentLanguage, exercisesProfiles },
  } = useContext(SettingsContext);
  const profile = exercisesProfiles.current;
  const exercises =
    profile && exercisesProfiles.profiles[exercisesProfiles.current].list;
  const startTraining = () => {
    if (exercises.length) setIsTraining(true);
  };
  let InnerComponent = null;
  if (!profile) {
    InnerComponent = (
      <TapToStart>{training.noProfileError[currentLanguage]}</TapToStart>
    );
  } else if (!exercises.length) {
    InnerComponent = (
      <TapToStart>{training.noExercisesError[currentLanguage]}</TapToStart>
    );
  } else if (!isTraining) {
    InnerComponent = (
      <TapToStart>{training.tapToStart[currentLanguage]}</TapToStart>
    );
  } else {
    InnerComponent = <TrainingStarted trainingData={exercises} />;
  }

  return (
    <MenuContextProvider>
      <Layout>
        <SEO title="Training" />
        <StyledWrapper
          fluid={data.bg.childImageSharp.fluid}
          onClick={startTraining}
        >
          {InnerComponent}
        </StyledWrapper>
      </Layout>
    </MenuContextProvider>
  );
};

export default TrainingPage;
