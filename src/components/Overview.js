import React, { useContext, useState } from "react";
import { Link } from "gatsby";
import styled, { ThemeProvider } from "styled-components";
import theme from "../utils/theme";
import ExercisesProfilesManager from "./ExercisesProfilesManager/ExercisesProfilesManager";
import { IconButton, Tooltip, Paper } from "@material-ui/core";
import { Settings as GearIcon, GitHub } from "@material-ui/icons";
import ExercisesList from "./ExercisesList/ExercisesList";
import { overview } from "../translations";
import { SettingsContext } from "../contexts/SettingsContext";
import AddOrEditExerciseDialog, {
  TYPES as dialogTypes,
} from "./AddOrEditExerciseDialog";
import AddExerciseSection from "./AddExerciseSection";
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
    settings: { currentLanguage, exercisesProfiles },
  } = useContext(SettingsContext);
  const [
    [addorEditExerciseDialogShown, addOrEditExerciseDialogConfig],
    setAddExerciseDialogShown,
  ] = useState([false, {}]);

  const openAddOrEditExerciseDialog = (type, exerciseId) =>
    setAddExerciseDialogShown([true, { type, id: exerciseId }]);

  const closeAddOrEditExerciseDialog = () =>
    setAddExerciseDialogShown([false, addOrEditExerciseDialogConfig]); //keeping config prevents text flashing while closing dialog

  const openAddExerciseDialog = () => {
    openAddOrEditExerciseDialog(dialogTypes.ADD);
  };
  const openEditExerciseDialog = id => {
    openAddOrEditExerciseDialog(dialogTypes.EDIT, id);
  };

  return (
    <ThemeProvider theme={theme}>
      <>
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
            <ExercisesProfilesManager />
            {exercisesProfiles.current && (
              <AddExerciseSection openDialog={openAddExerciseDialog} />
            )}
            <AddOrEditExerciseDialog
              shown={addorEditExerciseDialogShown}
              config={addOrEditExerciseDialogConfig}
              closeDialog={closeAddOrEditExerciseDialog}
            />
          </HeaderSection>
          <ExercisesList openEditExerciseDialog={openEditExerciseDialog} />
        </StyledMotionWrapper>
      </>
    </ThemeProvider>
  );
};
export default Overview;
