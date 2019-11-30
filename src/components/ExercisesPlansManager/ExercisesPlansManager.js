import React, { useContext, useState } from "react";
import styled from "styled-components";
import { SettingsContext, actionTypes } from "../../contexts/SettingsContext";
import {
  Select,
  MenuItem,
  IconButton,
  InputLabel,
  Tooltip,
} from "@material-ui/core";
import { Edit, DeleteForever, Add } from "@material-ui/icons";
import { exercisesPlansManager } from "../../translations";
import AddNewPlan from "./Dialogs/AddNewPlan";
import DeletePlan from "./Dialogs/DeletePlan";
import EditPlanName from "./Dialogs/EditPlanName";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledAddButton = styled(Add)`
  @keyframes shine {
    to {
      color: ${({ theme }) => theme.colors.green};
      background-color: ${({ theme }) => theme.colors.dark};
    }
  }
  border-radius: 50%;
  animation: ${({ shine }) => shine && "shine 2s alternate infinite"};
`;

const ExercisesPlansManager = () => {
  const {
    settings: { exercisesPlans, currentLanguage },
    dispatch,
  } = useContext(SettingsContext);
  const plansEmpty = !Object.keys(exercisesPlans.plans).length;
  const EMPTY_PLAN = "EMPTY_PLAN";

  const [addPlanDialogShown, setAddPlanDialogShown] = useState(false);
  const [deletePlanDialogShown, setDeletePlanDialogShown] = useState(false);
  const [editPlanNameDialogShown, setEditPlanNameDialogShown] = useState(false);

  const showAddPlanDialog = () => setAddPlanDialogShown(true);
  const closeAddPlanDialog = () => setAddPlanDialogShown(false);

  const showDeletePlanDialog = () => setDeletePlanDialogShown(true);
  const closeDeletePlanDialog = () => setDeletePlanDialogShown(false);

  const showEditPlanNameDialog = () => setEditPlanNameDialogShown(true);
  const closeEditPlanNameDialog = () => setEditPlanNameDialogShown(false);

  const handlePlanChange = e => {
    const value = e.target.value;
    if (value === EMPTY_PLAN) return;
    dispatch({
      type: actionTypes.SET_CURRENT_EXERCISES_PLAN,
      payload: value,
    });
  };

  return (
    <StyledWrapper>
      <InputLabel style={{ fontSize: "1.3rem" }} id="selectLabel" shrink>
        {!exercisesPlans.current
          ? exercisesPlansManager.selectLabel.noPlanSelected[currentLanguage]
          : exercisesPlansManager.selectLabel.currentPlan[currentLanguage]}
      </InputLabel>
      <div>
        <Select
          onChange={handlePlanChange}
          value={exercisesPlans.current || EMPTY_PLAN}
          variant="outlined"
          style={{ width: "150px" }}
          labelId="selectLabel"
        >
          {!Object.keys(exercisesPlans.plans).length ? (
            <MenuItem value={EMPTY_PLAN}>
              {exercisesPlansManager.noPlans[currentLanguage]}
            </MenuItem>
          ) : (
            Object.keys(exercisesPlans.plans).map(name => (
              <MenuItem value={name} key={exercisesPlans.plans[name].id}>
                {name}
              </MenuItem>
            ))
          )}
        </Select>
        <div>
          <Tooltip
            title={exercisesPlansManager.iconTitles.edit[currentLanguage]}
          >
            <span>
              <IconButton
                disabled={plansEmpty}
                onClick={showEditPlanNameDialog}
              >
                <Edit />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip
            title={exercisesPlansManager.iconTitles.delete[currentLanguage]}
          >
            <span>
              <IconButton disabled={plansEmpty} onClick={showDeletePlanDialog}>
                <DeleteForever />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip
            title={exercisesPlansManager.iconTitles.add[currentLanguage]}
          >
            <IconButton onClick={showAddPlanDialog}>
              <StyledAddButton
                shine={plansEmpty ? 1 : 0}
                fontSize={plansEmpty ? "large" : "default"}
              />
            </IconButton>
          </Tooltip>
          <EditPlanName
            shown={editPlanNameDialogShown}
            closeDialog={closeEditPlanNameDialog}
          />
          <AddNewPlan
            shown={addPlanDialogShown}
            closeDialog={closeAddPlanDialog}
          />
          <DeletePlan
            shown={deletePlanDialogShown}
            closeDialog={closeDeletePlanDialog}
          />
        </div>
      </div>
    </StyledWrapper>
  );
};

export default ExercisesPlansManager;
