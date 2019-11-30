import React, { useContext, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { SettingsContext, actionTypes } from "../../contexts/SettingsContext";
import { exercisesList, utils, addExercise } from "../../translations";
import { getValidationSchema, StyledForm } from "../AddExerciseSection";
import { Formik, useField } from "formik";

const EditExerciseDialog = ({ shown: exerciseId, closeDialog }) => {
  const {
    settings: { currentLanguage, exercisesPlans },
    dispatch,
  } = useContext(SettingsContext);
  const editExerciseDialog = exercisesList.dialogs.editExercise;

  const exercise =
    (exercisesPlans.current &&
      exercisesPlans.plans[exercisesPlans.current].list.find(
        ex => ex.id === exerciseId
      )) ||
    {};

  const initialValues = {
    name: exercise.name,
    duration: exercise.duration,
    rest: exercise.rest,
  };

  const validationSchema = useMemo(
    () => getValidationSchema(addExercise.errors, currentLanguage),
    [currentLanguage]
  );
  const handleSubmit = values => {
    dispatch({
      type: actionTypes.EDIT_EXERCISE,
      payload: { id: exerciseId, newValues: values },
    });
    closeDialog();
  };

  return (
    <Dialog open={!!exerciseId} onClose={closeDialog}>
      <DialogTitle>{editExerciseDialog.title[currentLanguage]}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <StyledForm id="editExerciseForm">
              <FormControl>
                <MyInputField
                  label={addExercise.labels.name[currentLanguage]}
                  placeholder={addExercise.placeholders.name[currentLanguage]}
                  name="name"
                  id="name"
                  type="input"
                  autoComplete="off"
                />
              </FormControl>
              <FormControl margin="dense">
                <MyInputField
                  label={addExercise.labels.duration[currentLanguage]}
                  placeholder={
                    addExercise.placeholders.duration[currentLanguage]
                  }
                  name="duration"
                  id="duration"
                  type="number"
                />
              </FormControl>
              <FormControl margin="dense">
                <MyInputField
                  label={addExercise.labels.rest[currentLanguage]}
                  placeholder={addExercise.placeholders.rest[currentLanguage]}
                  name="rest"
                  id="rest"
                  type="number"
                />
              </FormControl>
            </StyledForm>
          )}
        </Formik>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>{utils.cancel[currentLanguage]}</Button>
        <Button type="submit" form="editExerciseForm" color="secondary">
          {utils.change[currentLanguage]}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditExerciseDialog;

const MyInputField = ({
  placeholder,
  autoComplete,
  type = "input",
  label,
  ...props
}) => {
  const [field, meta] = useField(props);
  const errorMessage = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...field}
      label={label}
      placeholder={placeholder}
      type={type}
      helperText={errorMessage}
      error={!!errorMessage}
      variant="outlined"
      color="primary"
      autoComplete={autoComplete}
    />
  );
};
