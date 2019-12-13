import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";

const AddNewPlan = ({
  title,
  inputLabel,
  onClose,
  validate,
  initialValues,
  inputPlaceholder,
  closeButtonText,
  confirmButtonText,
  onConfirm,
}) => {
  const fieldName = Object.keys(initialValues)[0];
  if (!fieldName) throw new Error("you must specify field name");

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onConfirm}
        >
          {({ errors }) => {
            return (
              <Form id="addNewPlanForm">
                <Field
                  label={inputLabel}
                  name={fieldName}
                  variant="outlined"
                  placeholder={inputPlaceholder}
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
        <Button onClick={onClose}>{closeButtonText}</Button>

        <Button type="submit" form="addNewPlanForm" color="secondary">
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewPlan;
