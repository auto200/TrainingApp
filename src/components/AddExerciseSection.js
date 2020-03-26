import React from "react";
import styled from "styled-components";
import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useModal } from "../contexts/ModalContext";
import { motion } from "framer-motion";
import modalTypes from "./Modals/modalTypes";
import { TYPES as innerTypes } from "./Modals/modals/AddOrEditExerciseModal";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Text = styled.div`
  color: rgba(255, 255, 255, 0.7);
  margin-right: 5px;
`;
const MotionFab = motion.custom(Fab);
const AddExerciseSection = () => {
  const { setCurrentModal, closeModal } = useModal();

  const showAddExerciseModal = () => {
    setCurrentModal({
      type: modalTypes.ADD_OR_EDIT,
      config: {
        type: innerTypes.ADD,
      },
      onClose: closeModal,
    });
  };

  return (
    <StyledWrapper>
      <Text>Add exercise:</Text>
      <MotionFab
        color="secondary"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={showAddExerciseModal}
      >
        <Add />
      </MotionFab>
    </StyledWrapper>
  );
};

export default AddExerciseSection;
