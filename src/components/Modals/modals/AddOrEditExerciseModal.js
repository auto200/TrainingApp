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
import { useExercises, actionTypes } from "../../../contexts/ExercisesContext";
import { Formik, useField, Form } from "formik";
import { v4 as uuid } from "uuid";
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
  const { dispatch, exercises } = useExercises();

  const exercise =
    (config.type === TYPES.EDIT &&
      exercises.current &&
      exercises.plans[exercises.current].list.find(
        (ex) => ex.id === config.id
      )) ||
    {};

  const validationSchema = yup.object().shape({
    name: yup.string().required("Please insert name"),
    duration: yup
      .number()
      .typeError("Please insert a number")
      .required("Please insert duration")
      .integer("Are you scientist?")
      .moreThan(9, "Pff lame (at least 10s)"),
    rest: yup
      .number()
      .typeError("Please insert a number")
      .required("Please insert rest duration")
      .integer("Are you scientist?"),
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

  const handleSubmit = (values) => {
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
        {config.type === TYPES.ADD ? "Add new exercise!" : "Edit exercise"}
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
                  label="Exercise name"
                  placeholder={"e.g Push ups"}
                  name="name"
                  id="name"
                  type="input"
                  autoComplete="off"
                  autoFocus
                />
              </FormControl>
              <FormControl margin="dense">
                <MyInputField
                  label={"                    Duration (s)"}
                  placeholder={"e.g 30"}
                  name="duration"
                  id="duration"
                  type="number"
                />
              </FormControl>
              <FormControl margin="dense">
                <MyInputField
                  label="Rest time (s)"
                  placeholder={"e.g 5"}
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
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" form="editExerciseForm" color="secondary">
          {config.type === TYPES.ADD ? "Add" : "Change"}
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
