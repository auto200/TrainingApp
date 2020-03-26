import React from "react";
import styled from "styled-components";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { useSettings } from "../../../contexts/SettingsContext";
import { useExercises, actionTypes } from "../../../contexts/ExercisesContext";
import { addOrEditExerciseDialog, utils } from "../../../translations";
import { Formik, useField, Form } from "formik";
import uuid from "uuid/v4";
import * as yup from "yup";

export const TYPES = {
  ADD: "ADD",
  EDIT: "EDIT",
};
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
/*
TODO:
refactor this shitty ass ugly looking component to be more generic when i feel its worth it
*/
const AddOrEditExerciseDialog = ({ config = {}, onClose }) => {
  const {
    settings: { currentLanguage },
  } = useSettings();

  const { dispatch, exercises } = useExercises();

  const exercise =
    (config.type === TYPES.EDIT &&
      exercises.current &&
      exercises.plans[exercises.current].list.find(
        ex => ex.id === config.id
      )) ||
    {};

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required(addOrEditExerciseDialog.errors.name.required[currentLanguage]),
    duration: yup
      .number()
      .typeError(
        addOrEditExerciseDialog.errors.duration.typeError[currentLanguage]
      )
      .required(
        addOrEditExerciseDialog.errors.duration.required[currentLanguage]
      )
      .integer(addOrEditExerciseDialog.errors.duration.integer[currentLanguage])
      .moreThan(
        9,
        addOrEditExerciseDialog.errors.duration.moreThan[currentLanguage]
      ),
    rest: yup
      .number()
      .typeError(addOrEditExerciseDialog.errors.rest.typeError[currentLanguage])
      .required(addOrEditExerciseDialog.errors.rest.required[currentLanguage])
      .integer(addOrEditExerciseDialog.errors.rest.integer[currentLanguage]),
  });
  const defaultValues = {
    name: "",
    duration: "30",
    rest: "5",
  };
  const initialValues =
    (Object.keys(exercise).length && {
      name: exercise.name,
      duration: exercise.duration,
      rest: exercise.rest,
    }) ||
    defaultValues;

  const handleSubmit = values => {
    if (config.type === TYPES.ADD) {
      dispatch({
        type: actionTypes.ADD_EXERCISE,
        payload: { ...values, id: uuid() },
      });
    } else {
      dispatch({
        type: actionTypes.EDIT_EXERCISE,
        payload: { id: config.id, newValues: values },
      });
    }
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>
        {config.type === TYPES.ADD
          ? addOrEditExerciseDialog.title.add[currentLanguage]
          : addOrEditExerciseDialog.title.edit[currentLanguage]}
      </DialogTitle>
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
                  label={addOrEditExerciseDialog.labels.name[currentLanguage]}
                  placeholder={
                    addOrEditExerciseDialog.placeholders.name[currentLanguage]
                  }
                  name="name"
                  id="name"
                  type="input"
                  autoComplete="off"
                  autoFocus
                />
              </FormControl>
              <FormControl margin="dense">
                <MyInputField
                  label={
                    addOrEditExerciseDialog.labels.duration[currentLanguage]
                  }
                  placeholder={
                    addOrEditExerciseDialog.placeholders.duration[
                      currentLanguage
                    ]
                  }
                  name="duration"
                  id="duration"
                  type="number"
                />
              </FormControl>
              <FormControl margin="dense">
                <MyInputField
                  label={addOrEditExerciseDialog.labels.rest[currentLanguage]}
                  placeholder={
                    addOrEditExerciseDialog.placeholders.rest[currentLanguage]
                  }
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
        <Button onClick={onClose}>{utils.cancel[currentLanguage]}</Button>
        <Button type="submit" form="editExerciseForm" color="secondary">
          {config.type === TYPES.ADD
            ? utils.add[currentLanguage]
            : utils.change[currentLanguage]}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrEditExerciseDialog;

const MyInputField = ({
  placeholder,
  autoComplete,
  type,
  label,
  autoFocus,
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
      autoFocus={autoFocus}
    />
  );
};
