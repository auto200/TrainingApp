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
import uuid from "uuid/v4";

const initialValues = {
  profileName: "",
};

const AddNewProfile = ({ shown, closeDialog }) => {
  const {
    settings: { currentLanguage, exercisesProfiles },
    dispatch,
  } = useContext(SettingsContext);
  const addNewProfile = exercisesProfilesManager.dialogs.addNewProfile;

  const validate = values => {
    const errors = {};
    if (!values.profileName.length) {
      errors.profileName = addNewProfile.inputErrors.empty[currentLanguage];
    } else if (
      Object.keys(exercisesProfiles.profiles).includes(values.profileName)
    ) {
      errors.profileName =
        addNewProfile.inputErrors.alreadyExists[currentLanguage];
    }
    return errors;
  };
  const handleSubmit = ({ profileName }) => {
    dispatch({
      type: actionTypes.CREATE_EXERCISES_PROFILE,
      payload: {
        name: profileName,
        id: uuid(),
        list: [],
      },
    });
    dispatch({
      type: actionTypes.SET_CURRENT_EXERCISES_PROFILE,
      payload: profileName,
    });
    closeDialog();
  };

  return (
    <Dialog open={shown} onClose={closeDialog}>
      <DialogTitle>{addNewProfile.title[currentLanguage]}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ errors }) => {
            return (
              <Form id="addNewProfileForm">
                <Field
                  label={addNewProfile.inputLabel[currentLanguage]}
                  name="profileName"
                  variant="outlined"
                  placeholder={addNewProfile.inputPlaceholder[currentLanguage]}
                  error={!!errors.profileName}
                  helperText={errors.profileName}
                  autoFocus
                  as={TextField}
                  autoComplete="off"
                />
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>{utils.cancel[currentLanguage]}</Button>

        <Button type="submit" form="addNewProfileForm" color="secondary">
          {utils.add[currentLanguage]}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewProfile;
