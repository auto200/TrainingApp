import React, { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import modalTypes from "./modalTypes";
import ConfirmModal from "./modals/ConfirmModal";
import SingleInputModal from "./modals/SingleInputModal";
import AddOrEditExerciseModal from "./modals/AddOrEditExerciseModal";

const Modals = {
  [modalTypes.CONFIRM]: ConfirmModal,
  [modalTypes.SINGLE_INPUT]: SingleInputModal,
  [modalTypes.ADD_OR_EDIT]: AddOrEditExerciseModal,
};

const ModalManager = () => {
  const { currentModal } = useContext(ModalContext);

  if (currentModal.type) {
    const ModalComponent = Modals[currentModal.type];
    return <ModalComponent {...currentModal} />;
  }
  return null;
};

export default ModalManager;
