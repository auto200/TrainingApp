import React, { useContext } from "react";
import styled from "styled-components";
import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { exercisesPlansManager } from "../translations";
import { SettingsContext } from "../contexts/SettingsContext";
import { motion } from "framer-motion";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Text = styled.div`
  color: rgba(255, 255, 255, 0.7);
  margin-right: 5px;
`;
const MotionFab = motion.custom(Fab);
const AddExerciseSection = ({ openDialog }) => {
  const {
    settings: { currentLanguage },
  } = useContext(SettingsContext);

  return (
    <StyledWrapper>
      <Text>{exercisesPlansManager.addNewPlan[currentLanguage]}</Text>
      <MotionFab
        color="secondary"
        onClick={openDialog}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <Add />
      </MotionFab>
    </StyledWrapper>
  );
};

export default AddExerciseSection;
