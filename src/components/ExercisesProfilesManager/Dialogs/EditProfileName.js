import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";
import {
  SettingsContext,
  actionTypes,
} from "../../../contexts/SettingsContext";
import { exercisesProfilesManager, utils } from "../../../translations";

const EditProfile = ({ shown, closeDialog }) => {
  const {
    settings: { currentLanguage, exercisesProfiles },
    dispatch,
  } = useContext(SettingsContext);
  const editProfileName = exercisesProfilesManager.dialogs.editProfileName;
  const initialValues = {
    profileName: exercisesProfiles.current,
  };

  const validate = values => {
    const errors = {};
    if (!values.profileName.length) {
      errors.profileName = editProfileName.inputErrors.empty[currentLanguage];
    } else if (
      //check if other profiles incudes new name
      Object.keys(exercisesProfiles.profiles)
        .filter(el => el !== exercisesProfiles.current)
        .includes(values.profileName)
    ) {
      errors.profileName =
        editProfileName.inputErrors.alreadyExists[currentLanguage];
    }
    return errors;
  };
  const handleSubmit = ({ profileName }) => {
    if (profileName === exercisesProfiles.current) {
      closeDialog();
      return;
    }
    dispatch({
      type: actionTypes.EDIT_CURRENT_EXERCISES_PROFILE_NAME,
      payload: profileName,
    });
    closeDialog();
  };

  return (
    <Dialog open={shown} onClose={closeDialog}>
      <DialogTitle>{editProfileName.title[currentLanguage]}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ errors }) => {
            return (
              <Form id="editProfileNameForm">
                <Field
                  label={editProfileName.inputLabel[currentLanguage]}
                  name="profileName"
                  variant="outlined"
                  placeholder={
                    editProfileName.inputPlaceholder[currentLanguage]
                  }
                  error={!!errors.profileName}
                  helperText={errors.profileName}
                  autoFocus
                  as={TextField}
                />
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>{utils.cancel[currentLanguage]}</Button>

        <Button type="submit" form="editProfileNameForm" color="secondary">
          {utils.change[currentLanguage]}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfile;
