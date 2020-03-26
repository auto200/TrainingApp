import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useSettings } from "../../contexts/SettingsContext";
import { useExercises, actionTypes } from "../../contexts/ExercisesContext";
import { exercisesList } from "../../translations";
import { Paper } from "@material-ui/core";
import ExerciseItem from "./ExerciseItem";
import { motion, AnimatePresence } from "framer-motion";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const ExercisesListWrapper = styled(motion.custom(Paper))`
  height: 40vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
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
    settings: { currentLanguage },
  } = useSettings();
  const { exercises, dispatch } = useExercises();
  const listRef = useRef(null);
  const currentExercisePlan = exercises.plans[exercises.current];
  const previousExercisesCount = useRef(
    currentExercisePlan && currentExercisePlan.list.length
  );
  //autoscroll down on new exercise added
  useEffect(() => {
    if (!currentExercisePlan) return;
    if (previousExercisesCount.current < currentExercisePlan.list.length) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
    previousExercisesCount.current = currentExercisePlan.list.length;
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
    //nothing changed
    if (source.index === destination.index) return;

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
                {!exercises.current ? (
                  <EmptyListWarning>
                    {exercisesList.noPlan[currentLanguage]}
                  </EmptyListWarning>
                ) : currentExercisePlan.list.length ? (
                  <AnimatePresence>
                    {currentExercisePlan.list.map((exercise, index) => (
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
