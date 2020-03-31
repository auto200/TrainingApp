import React, { useState } from "react";
import SEO from "../components/Seo";
import styled from "styled-components";
import TrainingStarted from "../components/TrainingStarted";
import { useExercises } from "../contexts/ExercisesContext";
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
  const { exercises: exercisesPlans } = useExercises();
  const plan = exercisesPlans.current;
  const exercises = plan && exercisesPlans.plans[exercisesPlans.current].list;
  const startTraining = () => {
    if (exercises.length) setIsTraining(true);
  };
  let InnerComponent = null;
  if (!plan) {
    InnerComponent = (
      <TapToStart>
        To start training You need to create plan in the overview section
      </TapToStart>
    );
  } else if (!exercises.length) {
    InnerComponent = (
      <TapToStart>
        You dont have any exercised added yet. Change it by going to overview!
      </TapToStart>
    );
  } else if (!isTraining) {
    InnerComponent = <TapToStart>TAP to begain exercising</TapToStart>;
  } else {
    InnerComponent = <TrainingStarted trainingData={exercises} />;
  }

  return (
    <>
      <SEO title="Training" />
      <StyledWrapper
        fluid={data.bg.childImageSharp.fluid}
        onClick={startTraining}
      >
        {InnerComponent}
      </StyledWrapper>
    </>
  );
};

export default TrainingPage;
