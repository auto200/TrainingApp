import React, { useContext } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import ExercisesPlansManager from "./ExercisesPlansManager/ExercisesPlansManager";
import { IconButton, Tooltip, Paper } from "@material-ui/core";
import AddExerciseSection from "./AddExerciseSection";
import { Settings as GearIcon, GitHub } from "@material-ui/icons";
import ExercisesList from "./ExercisesList/ExercisesList";
import { overview } from "../translations";
import { SettingsContext } from "../contexts/SettingsContext";
import { motion } from "framer-motion";

const StyledMotionWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
`;
const GearIconContainer = styled(Link)`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;
const GitHubIconContainer = styled.a`
  position: absolute;
  top: 0;
  left: 0;
`;
const Title = styled.h1`
  color: ${({ theme }) => theme.colors.green};
`;
const HeaderSection = styled(Paper)`
  max-width: 550px;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Overview = () => {
  const {
    settings: { currentLanguage, exercisesPlans },
  } = useContext(SettingsContext);

  return (
    <StyledMotionWrapper animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
      <GitHubIconContainer
        href="https://github.com/auto200/TrainingApp"
        target="_blank"
      >
        <IconButton>
          <GitHub />
        </IconButton>
      </GitHubIconContainer>
      <GearIconContainer to="/settings">
        <Tooltip title={overview.settingsTooltip[currentLanguage]}>
          <IconButton>
            <GearIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </GearIconContainer>
      <Title>{overview.title[currentLanguage]}</Title>
      <HeaderSection>
        <ExercisesPlansManager />
        {exercisesPlans.current && <AddExerciseSection />}
      </HeaderSection>
      <ExercisesList />
      {exercisesPlans.current &&
        exercisesPlans.plans[exercisesPlans.current].list.length >= 2 && (
          <div style={{ textAlign: "right", width: "95%", maxWidth: 550 }}>
            {overview.reorderHint[currentLanguage]}
          </div>
        )}
    </StyledMotionWrapper>
  );
};
export default Overview;
