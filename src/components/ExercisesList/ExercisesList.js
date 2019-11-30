import React, { useContext, useState } from "react";
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

const ExercisesListWrapper = styled(Paper)`
  height: 40vh;
  width: 100%;
  max-width: 550px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
const EmptyListWarning = styled.div`
  margin: auto;
  font-size: 1.6rem;
  text-align: center;
  padding: 5px;
`;

const ExercisesList = ({ openEditExerciseDialog }) => {
  const {
    settings: { currentLanguage, exercisesProfiles },
  } = useContext(SettingsContext);
  const exercises = exercisesProfiles.profiles[exercisesProfiles.current];
  const [exerciseToDeleteId, setExerciseToDeleteId] = useState("");

  const requestDeleteExercise = id => setExerciseToDeleteId(id);
  const closeDeleteExerciseDialog = () => setExerciseToDeleteId("");

  return (
    <>
      <ExercisesListWrapper>
        {!exercisesProfiles.current ? (
          <EmptyListWarning>
            {exercisesList.noProfile[currentLanguage]}
          </EmptyListWarning>
        ) : exercises.list.length ? (
          exercises.list.map(exercise => (
            <ListItem
              key={exercise.id}
              id={exercise.id}
              name={exercise.name}
              duration={exercise.duration}
              rest={exercise.rest}
              requestDeleteExercise={requestDeleteExercise}
              openEditExerciseDialog={openEditExerciseDialog}
            />
          ))
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
};

const StyledListItem = styled.div`
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

    return (
      <StyledListItem>
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
      </StyledListItem>
    );
  }
);

export default ExercisesList;
