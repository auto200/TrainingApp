import React, { useContext, useState, useCallback } from "react";
import styled from "styled-components";
import { SettingsContext } from "../../contexts/SettingsContext";
import { exercisesList } from "../../translations";
import { Paper, IconButton, Tooltip } from "@material-ui/core";
import {
  FitnessCenter,
  Restore,
  DeleteForever,
  Edit,
} from "@material-ui/icons";
import DeleteExerciseDialog from "./DeleteExerciseDialog";
import { motion, AnimatePresence } from "framer-motion";

const ExercisesListWrapper = styled(motion.custom(Paper))`
  height: 40vh;
  width: 100%;
  max-width: 550px;
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
  return (
    <>
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
            {exercises.list.map(exercise => (
              <ListItem
                key={exercise.id}
                id={exercise.id}
                name={exercise.name}
                duration={exercise.duration}
                rest={exercise.rest}
                requestDeleteExercise={requestDeleteExercise}
                openEditExerciseDialog={openEditExerciseDialog}
              />
            ))}
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
    </>
  );
});

const MotionStyledListItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 1.5rem;
`;
const InfoContainder = styled.div`
  flex-grow: 2;
  display: flex;
  flex-wrap: wrap;
  word-break: break-all;
`;
const Name = styled.div`
  &::first-letter {
    text-transform: uppercase;
  }
`;
const ListItem = React.memo(
  ({
    id,
    name,
    duration,
    requestDeleteExercise,
    openEditExerciseDialog,
    rest,
  }) => {
    const {
      settings: { currentLanguage },
    } = useContext(SettingsContext);
    const handleDeleteItem = () => requestDeleteExercise(id);
    const handleEditItem = () => openEditExerciseDialog(id);

    const itemVariants = {
      start: {
        x: -50,
        opacity: 0,
      },
      end: {
        x: 0,
        opacity: 1,
      },
    };

    return (
      <MotionStyledListItem
        variants={itemVariants}
        transition={{ ease: "easeOut" }}
        exit={{ opacity: 0, x: "-100%" }}
      >
        <InfoContainder>
          <Name>{name}:&nbsp;</Name>
          <Tooltip title={exercisesList.tooltips.timings[currentLanguage]}>
            <div style={{ display: "flex" }}>
              <FitnessCenter />
              {duration}s |&nbsp;
              <Restore />
              {rest}s
            </div>
          </Tooltip>
        </InfoContainder>
        <div style={{ display: "flex" }}>
          <Tooltip title={exercisesList.tooltips.edit[currentLanguage]}>
            <IconButton onClick={handleEditItem}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title={exercisesList.tooltips.delete[currentLanguage]}>
            <IconButton onClick={handleDeleteItem}>
              <DeleteForever />
            </IconButton>
          </Tooltip>
        </div>
      </MotionStyledListItem>
    );
  }
);

export default ExercisesList;
