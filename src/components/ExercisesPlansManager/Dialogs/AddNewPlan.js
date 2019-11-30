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
import { exercisesPlansManager, utils } from "../../../translations";
import uuid from "uuid/v4";

const initialValues = {
  planName: "",
};

const AddNewPlan = ({ shown, closeDialog }) => {
  const {
    settings: { currentLanguage, exercisesPlans },
    dispatch,
  } = useContext(SettingsContext);
  const addNewPlan = exercisesPlansManager.dialogs.addNewPlan;

  const validate = values => {
    const errors = {};
    if (!values.planName.length) {
      errors.planName = addNewPlan.inputErrors.empty[currentLanguage];
    } else if (Object.keys(exercisesPlans.plans).includes(values.planName)) {
      errors.planName = addNewPlan.inputErrors.alreadyExists[currentLanguage];
    }
    return errors;
  };
  const handleSubmit = ({ planName }) => {
    dispatch({
      type: actionTypes.CREATE_EXERCISES_PLAN,
      payload: {
        name: planName,
        id: uuid(),
        list: [],
      },
    });
    dispatch({
      type: actionTypes.SET_CURRENT_EXERCISES_PLAN,
      payload: planName,
    });
    closeDialog();
  };

  return (
    <Dialog open={shown} onClose={closeDialog}>
      <DialogTitle>{addNewPlan.title[currentLanguage]}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ errors }) => {
            return (
              <Form id="addNewPlanForm">
                <Field
                  label={addNewPlan.inputLabel[currentLanguage]}
                  name="planName"
                  variant="outlined"
                  placeholder={addNewPlan.inputPlaceholder[currentLanguage]}
                  error={!!errors.planName}
                  helperText={errors.planName}
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

        <Button type="submit" form="addNewPlanForm" color="secondary">
          {utils.add[currentLanguage]}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewPlan;
