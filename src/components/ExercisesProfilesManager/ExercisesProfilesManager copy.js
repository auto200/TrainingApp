import React, { useContext, useState } from "react";
import styled from "styled-components";
import { SettingsContext, actionTypes } from "../../contexts/SettingsContext";
import {
  Paper,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputLabel,
  Tooltip,
} from "@material-ui/core";
import { Edit, DeleteForever, Add } from "@material-ui/icons";
import { exercisesProfilesManager, utils } from "../../translations";
import uuid from "uuid/v4";

const StyledWrapper = styled(Paper)`
  max-width: 550px;
  width: 100%;
  padding: 10px;
`;

const StyledAddButton = styled(Add)`
  @keyframes shine {
    to {
      color: ${({ theme }) => theme.colors.green};
      background-color: ${({ theme }) => theme.colors.dark};
    }
  }
  border-radius: 50%;
  animation: ${({ shine }) => shine && "shine 2s alternate infinite"};
`;

const ExercisesProfilesManager = () => {
  const {
    settings: { exercisesProfiles, currentLanguage },
    dispatch,
  } = useContext(SettingsContext);
  const profilesEmpty = !Object.keys(exercisesProfiles.profiles).length;
  const EMPTY_PROFILE = "EMPTY_PROFILE";

  const [dialogShown, setDialogShown] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [profileNameError, setProfileNameError] = useState("");

  const handleShowDialog = () => setDialogShown(true);

  const closeDialog = () => {
    setDialogShown(false);
    setNewProfileName("");
    setProfileNameError("");
  };

  const handleNewProfileNameChange = e => {
    setNewProfileName(e.target.value);
  };

  const validateProfileName = () => {
    if (!newProfileName.length) {
      setProfileNameError(
        exercisesProfilesManager.dialog.inputErrors.empty[currentLanguage]
      );
      return false;
    }
    if (Object.keys(exercisesProfiles.profiles).includes(newProfileName)) {
      setProfileNameError(
        exercisesProfilesManager.dialog.inputErrors.alreadyExists[
          currentLanguage
        ]
      );
      return false;
    }
    setProfileNameError("");
    return true;
  };

  const handleProfileChange = e => {
    const value = e.target.value;
    if (value === EMPTY_PROFILE) return;
    dispatch({
      type: actionTypes.SET_CURRENT_EXERCISES_PROFILE,
      payload: value,
    });
  };

  const handleAddProfile = () => {
    const nameValid = validateProfileName();
    if (!nameValid) return;
    dispatch({
      type: actionTypes.CREATE_EXERCISES_PROFILE,
      payload: {
        name: newProfileName,
        id: uuid(),
        list: [],
      },
    });
    dispatch({
      type: actionTypes.SET_CURRENT_EXERCISES_PROFILE,
      payload: newProfileName,
    });
    closeDialog();
  };

  return (
    <StyledWrapper>
      <InputLabel style={{ fontSize: "1.3rem" }} id="selectLabel" shrink>
        {!exercisesProfiles.current
          ? exercisesProfilesManager.title.noProfileSelected[currentLanguage]
          : exercisesProfilesManager.title.currentProfile[currentLanguage]}
      </InputLabel>
      <div
        style={{
          display: `flex`,
          flexDirection: `row`,
          alignItems: `center`,
          justifyContent: "space-between",
        }}
      >
        <Select
          onChange={handleProfileChange}
          value={exercisesProfiles.current || EMPTY_PROFILE}
          variant="outlined"
          style={{ width: "150px" }}
          labelId="selectLabel"
        >
          {!Object.keys(exercisesProfiles.profiles).length ? (
            <MenuItem value={EMPTY_PROFILE}>
              {exercisesProfilesManager.noProfiles[currentLanguage]}
            </MenuItem>
          ) : (
            Object.keys(exercisesProfiles.profiles).map(name => (
              <MenuItem value={name} key={exercisesProfiles.profiles[name].id}>
                {name}
              </MenuItem>
            ))
          )}
        </Select>
        <div>
          <Tooltip
            title={exercisesProfilesManager.iconTitles.edit[currentLanguage]}
          >
            <IconButton disabled={profilesEmpty}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={exercisesProfilesManager.iconTitles.delete[currentLanguage]}
          >
            <IconButton disabled={profilesEmpty}>
              <DeleteForever />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={exercisesProfilesManager.iconTitles.add[currentLanguage]}
          >
            <IconButton onClick={handleShowDialog}>
              <StyledAddButton
                shine={profilesEmpty}
                fontSize={profilesEmpty ? "large" : "default"}
              />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <Dialog open={dialogShown} onClose={closeDialog}>
        <DialogTitle>
          {exercisesProfilesManager.dialog.title[currentLanguage]}
        </DialogTitle>
        <DialogContent>
          <TextField
            label={exercisesProfilesManager.dialog.inputLabel[currentLanguage]}
            variant="outlined"
            placeholder={
              exercisesProfilesManager.dialog.inputLabel[currentLanguage]
            }
            value={newProfileName}
            onChange={handleNewProfileNameChange}
            onBlur={validateProfileName}
            error={!!profileNameError}
            helperText={profileNameError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>{utils.cancel[currentLanguage]}</Button>

          <Button onClick={handleAddProfile} color="secondary" autoFocus>
            {utils.add[currentLanguage]}
          </Button>
        </DialogActions>
      </Dialog>
    </StyledWrapper>
  );
};

export default ExercisesProfilesManager;
