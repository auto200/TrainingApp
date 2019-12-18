import React, { useState } from "react";
import SEO from "../components/seo";
import styled, { ThemeProvider } from "styled-components";
import theme from "../utils/theme";
import TrainingStarted from "../components/TrainingStarted";
import { useSettings } from "../contexts/SettingsContext";
import { training } from "../translations";
import BackgroundImage from "gatsby-background-image";
import { useStaticQuery, graphql } from "gatsby";
import { menuHeight } from "../utils/constants";
import BottomMenu from "../components/BottomMenu";

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
    settings: { currentLanguage, exercisesPlans },
  } = useSettings();
  const plan = exercisesPlans.current;
  const exercises = plan && exercisesPlans.plans[exercisesPlans.current].list;
  const startTraining = () => {
    if (exercises.length) setIsTraining(true);
  };
  let InnerComponent = null;
  if (!plan) {
    InnerComponent = (
      <TapToStart>{training.noPlanError[currentLanguage]}</TapToStart>
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
    <ThemeProvider theme={theme}>
      {/* providing theme here because gatsby fails to build when doing it in gatsby-ssr */}
      <>
        <SEO title="Training" />
        <StyledWrapper
          fluid={data.bg.childImageSharp.fluid}
          onClick={startTraining}
        >
          {InnerComponent}
        </StyledWrapper>
        <BottomMenu />
      </>
    </ThemeProvider>
  );
};

export default TrainingPage;
