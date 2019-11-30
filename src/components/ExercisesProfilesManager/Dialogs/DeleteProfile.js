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
import { exercisesProfilesManager, utils } from "../../../translations";

const DeleteProfile = ({ shown, closeDialog }) => {
  const {
    settings: { currentLanguage, exercisesProfiles },
    dispatch,
  } = useContext(SettingsContext);
  const deleteProfile = exercisesProfilesManager.dialogs.deleteProfile;

  const handleDelete = () => {
    dispatch({
      type: actionTypes.DELETE_CURRENT_EXERCISES_PROFILE,
    });
    closeDialog();
  };

  return (
    <Dialog open={shown} onClose={closeDialog}>
      <DialogTitle>{deleteProfile.title[currentLanguage]}</DialogTitle>
      <DialogContent>
        <div>{deleteProfile.content[currentLanguage]}</div>
        <div>
          <b>{exercisesProfiles.current}</b>
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

export default DeleteProfile;
