import React, { useContext } from "react";
import styled from "styled-components";
import { SettingsContext, actionTypes } from "../../contexts/SettingsContext";
import { ModalContext } from "../../contexts/ModalContext";
import {
  Select,
  MenuItem,
  IconButton,
  InputLabel,
  Tooltip,
} from "@material-ui/core";
import { Edit, DeleteForever, Add } from "@material-ui/icons";
import { exercisesPlansManager, utils } from "../../translations";
import modalTypes from "../Modals/modalTypes";
import uuid from "uuid/v4";

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
  const { setCurrentModal, closeModal } = useContext(ModalContext);
  const noPlans = !Object.keys(exercisesPlans.plans).length;
  const EMPTY_PLAN = "EMPTY_PLAN";
  const addNewPlan = exercisesPlansManager.dialogs.addNewPlan;
  const editPlanName = exercisesPlansManager.dialogs.editPlanName;

  const handlePlanChange = e => {
    const value = e.target.value;
    if (value === EMPTY_PLAN) return;
    dispatch({
      type: actionTypes.SET_CURRENT_EXERCISES_PLAN,
      payload: value,
    });
  };

  const showEditPlanModal = () => {
    setCurrentModal({
      type: modalTypes.SINGLE_INPUT,
      title: exercisesPlansManager.dialogs.editPlanName.title[currentLanguage],
      inputLabel:
        exercisesPlansManager.dialogs.editPlanName.inputLabel[currentLanguage],
      inputPlaceholder:
        exercisesPlansManager.dialogs.editPlanName.inputPlaceholder[
          currentLanguage
        ],
      initialValues: {
        planName: exercisesPlans.current,
      },
      closeButtonText: utils.cancel[currentLanguage],
      onClose: closeModal,
      validate: values => {
        const errors = {};
        if (!values.planName.length) {
          errors.planName = editPlanName.inputErrors.empty[currentLanguage];
        }
        //check if other plans incudes new name
        else if (
          Object.keys(exercisesPlans.plans)
            .filter(el => el !== exercisesPlans.current)
            .includes(values.planName)
        ) {
          errors.planName =
            editPlanName.inputErrors.alreadyExists[currentLanguage];
        }
        return errors;
      },
      confirmButtonText: utils.change[currentLanguage],
      onConfirm: ({ planName }) => {
        if (planName === exercisesPlans.current) {
          closeModal();
          return;
        }
        dispatch({
          type: actionTypes.EDIT_CURRENT_EXERCISES_PLAN_NAME,
          payload: planName,
        });
        closeModal();
      },
    });
  };

  const showAddPlanModal = () => {
    setCurrentModal({
      type: modalTypes.SINGLE_INPUT,
      title: exercisesPlansManager.dialogs.addNewPlan.title[currentLanguage],
      inputLabel:
        exercisesPlansManager.dialogs.addNewPlan.inputLabel[currentLanguage],
      inputPlaceholder:
        exercisesPlansManager.dialogs.addNewPlan.inputPlaceholder[
          currentLanguage
        ],
      initialValues: {
        planName: "",
      },
      closeButtonText: utils.cancel[currentLanguage],
      onClose: closeModal,
      validate: values => {
        const errors = {};
        if (!values.planName.length) {
          errors.planName = addNewPlan.inputErrors.empty[currentLanguage];
        } else if (
          Object.keys(exercisesPlans.plans).includes(values.planName)
        ) {
          errors.planName =
            addNewPlan.inputErrors.alreadyExists[currentLanguage];
        }
        return errors;
      },
      confirmButtonText: utils.add[currentLanguage],
      onConfirm: ({ planName }) => {
        dispatch({
          type: actionTypes.CREATE_EXERCISES_PLAN,
          payload: {
            name: planName,
            id: uuid(),
            list: [],
          },
        });
        dispatch({
          type: actionTypes.SET_CURRENT_EXERCISES_PLAN,
          payload: planName,
        });
        closeModal();
      },
    });
  };

  const DeletePlanModalContent = (
    <>
      <div>
        {exercisesPlansManager.dialogs.deletePlan.content[currentLanguage]}
      </div>{" "}
      <b>{exercisesPlans.current}</b>
    </>
  );
  const showDeletePlanModal = () => {
    setCurrentModal({
      type: modalTypes.CONFIRM,
      title: exercisesPlansManager.dialogs.deletePlan.title[currentLanguage],
      content: DeletePlanModalContent,
      closeButtonText: utils.cancel[currentLanguage],
      onClose: closeModal,
      confirmButtonText: utils.delete[currentLanguage],
      onConfirm: () => {
        dispatch({
          type: actionTypes.DELETE_CURRENT_EXERCISES_PLAN,
        });
        closeModal();
      },
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
          {noPlans ? (
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
              <IconButton disabled={noPlans} onClick={showEditPlanModal}>
                <Edit />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip
            title={exercisesPlansManager.iconTitles.delete[currentLanguage]}
          >
            <span>
              <IconButton disabled={noPlans} onClick={showDeletePlanModal}>
                <DeleteForever />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip
            title={exercisesPlansManager.iconTitles.add[currentLanguage]}
          >
            <IconButton onClick={showAddPlanModal}>
              <StyledAddButton
                shine={noPlans ? 1 : 0}
                fontSize={noPlans ? "large" : "default"}
              />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default ExercisesPlansManager;
