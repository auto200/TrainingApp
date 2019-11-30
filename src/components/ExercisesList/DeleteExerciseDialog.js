import React, { useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { SettingsContext, actionTypes } from "../../contexts/SettingsContext";
import { exercisesList, utils } from "../../translations";

const DeleteExerciseDialog = ({ shown: exerciseId, closeDialog }) => {
  const {
    settings: { currentLanguage, exercisesProfiles },
    dispatch,
  } = useContext(SettingsContext);
  const deleteExerciseDialog = exercisesList.dialogs.deleteExercise;

  const exercise =
    exercisesProfiles.current &&
    exercisesProfiles.profiles[exercisesProfiles.current].list.find(
      ex => ex.id === exerciseId
    );
  const deleteExercise = () => {
    dispatch({
      type: actionTypes.DELETE_EXERCISE,
      payload: exerciseId,
    });
    closeDialog();
  };

  return (
    <Dialog open={!!exerciseId} onClose={closeDialog}>
      <DialogTitle>{deleteExerciseDialog.title[currentLanguage]}</DialogTitle>
      <DialogContent>
        <div>{deleteExerciseDialog.content[currentLanguage]}</div>
        <b>{exercise && exercise.name}</b>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>{utils.cancel[currentLanguage]}</Button>

        <Button onClick={deleteExercise} color="secondary">
          {utils.delete[currentLanguage]}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteExerciseDialog;
