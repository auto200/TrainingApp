import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

const ConfirmModal = ({
  title,
  content,
  closeButtonText,
  onClose,
  confirmButtonText,
  onConfirm,
}) => {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{closeButtonText}</Button>
        <Button onClick={onConfirm} color="secondary">
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
