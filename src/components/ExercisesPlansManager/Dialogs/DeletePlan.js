import React, { useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import {
  SettingsContext,
  actionTypes,
} from "../../../contexts/SettingsContext";
import { exercisesPlansManager, utils } from "../../../translations";

const DeletePlan = ({ shown, closeDialog }) => {
  const {
    settings: { currentLanguage, exercisesPlans },
    dispatch,
  } = useContext(SettingsContext);
  const deletePlan = exercisesPlansManager.dialogs.deletePlan;

  const handleDelete = () => {
    dispatch({
      type: actionTypes.DELETE_CURRENT_EXERCISES_PLAN,
    });
    closeDialog();
  };

  return (
    <Dialog open={shown} onClose={closeDialog}>
      <DialogTitle>{deletePlan.title[currentLanguage]}</DialogTitle>
      <DialogContent>
        <div>{deletePlan.content[currentLanguage]}</div>
        <div>
          <b>{exercisesPlans.current}</b>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>{utils.cancel[currentLanguage]}</Button>
        <Button onClick={handleDelete} color="secondary">
          {utils.delete[currentLanguage]}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePlan;
