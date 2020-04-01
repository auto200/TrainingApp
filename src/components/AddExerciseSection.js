import React from "react";
import styled from "styled-components";
import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useModal } from "../contexts/ModalContext";
import { motion } from "framer-motion";
import { useExercises } from "../contexts/ExercisesContext";
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
const AddExerciseSection = () => {
  const { setCurrentModal, closeModal } = useModal();
  const { exercises } = useExercises();
  const pulse = !exercises.plans[exercises.current].list.length;

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
      <motion.span
        initial={{ scale: 0 }}
        animate={pulse ? { scale: [1.2, 0.8, 1.2] } : { scale: 1 }}
        transition={pulse ? { loop: Infinity, duration: 2.5 } : {}}
        onClick={showAddExerciseModal}
      >
        <Fab color="secondary">
          <Add />
        </Fab>
      </motion.span>
    </StyledWrapper>
  );
};

export default AddExerciseSection;
