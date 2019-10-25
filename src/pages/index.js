import React, { useState, useEffect } from "react";
import SEO from "../components/seo";
import Layout from "../components/layout";
import styled from "styled-components";
import ExercisesList from "../components/ExercisesList/ExercisesList";
import AddExerciseSection from "../components/AddExerciseSection";
import MenuContextProvider from "../contexts/MenuContext";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
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

const IndexPage = () => {
  const [exercises, setExercises] = useState(getSavedExercises());

  useEffect(() => {
    localStorage.setItem("exercises", JSON.stringify(exercises));
  }, [exercises]);

  const deleteExercise = React.useCallback(id => {
    setExercises(exercises => {
      const newExercises = exercises.filter(item => item.id !== id);
      return newExercises;
    });
  }, []);

  return (
    <MenuContextProvider>
      <Layout>
        <SEO title="Home" />
        <StyledWrapper>
          <h1>Pompuj!</h1>
          <ExercisesList
            exercises={exercises}
            deleteExercise={deleteExercise}
          />
          <h2>Add new exercise!</h2>
          <AddExerciseSection setExercises={setExercises} />
          <button onClick={() => setExercises([])}>wipe list</button>
        </StyledWrapper>
      </Layout>
    </MenuContextProvider>
  );
};

export default IndexPage;
