import React, { useContext, useRef, useEffect } from "react";
import styled from "styled-components";
import { SettingsContext } from "../../contexts/SettingsContext";
import { exercisesList } from "../../translations";
import { Paper } from "@material-ui/core";
import ExerciseItem from "./ExerciseItem";
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

const ExercisesList = () => {
  const {
    settings: { currentLanguage, exercisesPlans },
    dispatch,
  } = useContext(SettingsContext);
  const listRef = useRef(null);
  const exercises = exercisesPlans.plans[exercisesPlans.current];
  const previousExercisesCount = useRef(exercises && exercises.list.length);
  //autoscroll down on new exercise added
  useEffect(() => {
    if (!exercises) return;
    if (previousExercisesCount.current < exercises.list.length) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
    previousExercisesCount.current = exercises.list.length;
  });
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
        {provided => {
          return (
            <div
              ref={provided.innerRef}
              style={{ maxWidth: 550, width: "100%" }}
            >
              <ExercisesListWrapper
                variants={wrapperVarianst}
                initial="start"
                animate="end"
                ref={listRef}
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
                      />
                    ))}
                    {provided.placeholder}
                  </AnimatePresence>
                ) : (
                  <EmptyListWarning>
                    {exercisesList.emptyList[currentLanguage]}
                  </EmptyListWarning>
                )}
              </ExercisesListWrapper>
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default ExercisesList;
