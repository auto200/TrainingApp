import React, { useContext, useState } from "react";
import styled from "styled-components";
import { SettingsContext, actionTypes } from "../../contexts/SettingsContext";
import {
  Select,
  MenuItem,
  IconButton,
  InputLabel,
  Tooltip,
} from "@material-ui/core";
import { Edit, DeleteForever, Add } from "@material-ui/icons";
import { exercisesProfilesManager } from "../../translations";
import AddNewProfile from "./Dialogs/AddNewProfile";
import DeleteProfile from "./Dialogs/DeleteProfile";
import EditProfileName from "./Dialogs/EditProfileName";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

  const [addProfileDialogShown, setAddProfileDialogShown] = useState(false);
  const [deleteProfileDialogShown, setDeleteProfileDialogShown] = useState(
    false
  );
  const [editProfileNameDialogShown, setEditProfileNameDialogShown] = useState(
    false
  );

  const showAddProfileDialog = () => setAddProfileDialogShown(true);
  const closeAddProfileDialog = () => setAddProfileDialogShown(false);

  const showDeleteProfileDialog = () => setDeleteProfileDialogShown(true);
  const closeDeleteProfileDialog = () => setDeleteProfileDialogShown(false);

  const showEditProfileNameDialog = () => setEditProfileNameDialogShown(true);
  const closeEditProfileNameDialog = () => setEditProfileNameDialogShown(false);

  const handleProfileChange = e => {
    const value = e.target.value;
    if (value === EMPTY_PROFILE) return;
    dispatch({
      type: actionTypes.SET_CURRENT_EXERCISES_PROFILE,
      payload: value,
    });
  };

  return (
    <StyledWrapper>
      <InputLabel style={{ fontSize: "1.3rem" }} id="selectLabel" shrink>
        {!exercisesProfiles.current
          ? exercisesProfilesManager.title.noProfileSelected[currentLanguage]
          : exercisesProfilesManager.title.currentProfile[currentLanguage]}
      </InputLabel>
      <div>
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
            <span>
              <IconButton
                disabled={profilesEmpty}
                onClick={showEditProfileNameDialog}
              >
                <Edit />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip
            title={exercisesProfilesManager.iconTitles.delete[currentLanguage]}
          >
            <span>
              <IconButton
                disabled={profilesEmpty}
                onClick={showDeleteProfileDialog}
              >
                <DeleteForever />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip
            title={exercisesProfilesManager.iconTitles.add[currentLanguage]}
          >
            <IconButton onClick={showAddProfileDialog}>
              <StyledAddButton
                shine={profilesEmpty ? 1 : 0}
                fontSize={profilesEmpty ? "large" : "default"}
              />
            </IconButton>
          </Tooltip>
          <EditProfileName
            shown={editProfileNameDialogShown}
            closeDialog={closeEditProfileNameDialog}
          />
          <AddNewProfile
            shown={addProfileDialogShown}
            closeDialog={closeAddProfileDialog}
          />
          <DeleteProfile
            shown={deleteProfileDialogShown}
            closeDialog={closeDeleteProfileDialog}
          />
        </div>
      </div>
    </StyledWrapper>
  );
};

export default ExercisesProfilesManager;
