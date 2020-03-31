import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useExercises, actionTypes } from "../../contexts/ExercisesContext";
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
  const { exercises, dispatch } = useExercises();
  const listRef = useRef(null);
  const currentExercisePlan = exercises.plans[exercises.current];
  const previousExercisesCount = useRef(
    currentExercisePlan && currentExercisePlan.list.length
  );
  //autoscroll down on new exercise add
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
                  <EmptyListWarning>Create training plan</EmptyListWarning>
                ) : currentExercisePlan.list.length ? (
                  // AnimatePresence> for some reason couses items to not unmount at all, this means there is also no exit animation. Updating package did not help
                  <>
                    {currentExercisePlan.list.map((exercise, index) => {
                      return (
                        <ExerciseItem
                          key={exercise.id}
                          id={exercise.id}
                          index={index}
                          name={exercise.name}
                          duration={exercise.duration}
                          rest={exercise.rest}
                        />
                      );
                    })}
                    {provided.placeholder}
                    {/*</AnimatePresence>*/}
                  </>
                ) : (
                  <EmptyListWarning>
                    This plan doesn't have any exercises yet. You can add them
                    above!
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
