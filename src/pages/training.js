import React, { useState } from "react";
import SEO from "../components/seo";
import Layout from "../components/layout";
import styled from "styled-components";
import MenuContextProvider from "../contexts/MenuContext";
import TrainingStarted from "../components/TrainingStarted";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
`;
const TapToStart = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.green};
  font-size: 2rem;
`;

const getSavedExercises = () => {
  const savedExercises = localStorage.getItem("exercises");
  if (savedExercises) {
    try {
      return JSON.parse(savedExercises);
    } catch (err) {}
  }
  return [];
};

const TrainingPage = () => {
  const [exercises] = useState(getSavedExercises());
  const [isTraining, setIsTraining] = useState(false);

  const startTraining = () => {
    setIsTraining(true);
  };

  return (
    <MenuContextProvider>
      <Layout>
        <SEO title="Home" />
        <StyledWrapper>
          {isTraining ? (
            <TrainingStarted trainingData={exercises} />
          ) : !exercises.length ? (
            <TapToStart>
              You dont have any exercised added yet. Fix it by going to
              overview!
            </TapToStart>
          ) : (
            <TapToStart onClick={startTraining}>
              Tap here to start training
            </TapToStart>
          )}
        </StyledWrapper>
      </Layout>
    </MenuContextProvider>
  );
};

export default TrainingPage;
