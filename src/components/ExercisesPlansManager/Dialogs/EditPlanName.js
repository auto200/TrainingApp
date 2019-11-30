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

const EditPlan = ({ shown, closeDialog }) => {
  const {
    settings: { currentLanguage, exercisesPlans },
    dispatch,
  } = useContext(SettingsContext);
  const editPlanName = exercisesPlansManager.dialogs.editPlanName;
  const initialValues = {
    planName: exercisesPlans.current,
  };

  const validate = values => {
    const errors = {};
    if (!values.planName.length) {
      errors.planName = editPlanName.inputErrors.empty[currentLanguage];
    } else if (
      //check if other plans incudes new name
      Object.keys(exercisesPlans.plans)
        .filter(el => el !== exercisesPlans.current)
        .includes(values.planName)
    ) {
      errors.planName = editPlanName.inputErrors.alreadyExists[currentLanguage];
    }
    return errors;
  };
  const handleSubmit = ({ planName }) => {
    if (planName === exercisesPlans.current) {
      closeDialog();
      return;
    }
    dispatch({
      type: actionTypes.EDIT_CURRENT_EXERCISES_PLAN_NAME,
      payload: planName,
    });
    closeDialog();
  };

  return (
    <Dialog open={shown} onClose={closeDialog}>
      <DialogTitle>{editPlanName.title[currentLanguage]}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ errors }) => {
            return (
              <Form id="editplanNameForm">
                <Field
                  label={editPlanName.inputLabel[currentLanguage]}
                  name="planName"
                  variant="outlined"
                  placeholder={editPlanName.inputPlaceholder[currentLanguage]}
                  error={!!errors.planName}
                  helperText={errors.planName}
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

        <Button type="submit" form="editplanNameForm" color="secondary">
          {utils.change[currentLanguage]}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPlan;
