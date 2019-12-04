import React, { useContext, useState, useCallback } from "react";
import styled from "styled-components";
import { SettingsContext } from "../../contexts/SettingsContext";
import { exercisesList } from "../../translations";
import { Paper } from "@material-ui/core";
import ExerciseItem from "./ExerciseItem";
import DeleteExerciseDialog from "./DeleteExerciseDialog";
import { motion, AnimatePresence } from "framer-motion";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { actionTypes } from "../../contexts/SettingsContext";

const ExercisesListWrapper = styled(motion.custom(Paper))`
  height: 40vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: none;
  overflow-y: auto;
`;
const EmptyListWarning = styled.div`
  margin: auto;
  font-size: 1.6rem;
  text-align: center;
  padding: 5px;
`;

const ExercisesList = React.memo(({ openEditExerciseDialog }) => {
  const {
    settings: { currentLanguage, exercisesPlans },
    dispatch,
  } = useContext(SettingsContext);
  const exercises = exercisesPlans.plans[exercisesPlans.current];
  const [exerciseToDeleteId, setExerciseToDeleteId] = useState("");
  const requestDeleteExercise = useCallback(
    id => setExerciseToDeleteId(id),
    []
  );
  const closeDeleteExerciseDialog = useCallback(
    () => setExerciseToDeleteId(""),
    []
  );
  const wrapperVarianst = {
    start: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const onDragEnd = result => {
    const { source, destination } = result;

    //component (finger/cursor) must be released inside list
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      dispatch({
        type: actionTypes.REORDER_EXERCISES,
        payload: {
          source: source.index,
          destination: destination.index,
        },
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="exercisesList">
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              style={{ maxWidth: 550, width: "100%" }}
            >
              <ExercisesListWrapper
                variants={wrapperVarianst}
                initial="start"
                animate="end"
              >
                {!exercisesPlans.current ? (
                  <EmptyListWarning>
                    {exercisesList.noPlan[currentLanguage]}
                  </EmptyListWarning>
                ) : exercises.list.length ? (
                  <AnimatePresence>
                    {exercises.list.map((exercise, index) => (
                      <ExerciseItem
                        key={exercise.id}
                        id={exercise.id}
                        index={index}
                        name={exercise.name}
                        duration={exercise.duration}
                        rest={exercise.rest}
                        requestDeleteExercise={requestDeleteExercise}
                        openEditExerciseDialog={openEditExerciseDialog}
                      />
                    ))}
                    {provided.placeholder}
                  </AnimatePresence>
                ) : (
                  <EmptyListWarning>
                    {exercisesList.emptyList[currentLanguage]}
                  </EmptyListWarning>
                )}
                <DeleteExerciseDialog
                  shown={exerciseToDeleteId}
                  closeDialog={closeDeleteExerciseDialog}
                />
              </ExercisesListWrapper>
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
});

export default ExercisesList;
