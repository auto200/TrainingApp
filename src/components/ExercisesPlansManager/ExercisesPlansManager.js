import React from "react";
import styled from "styled-components";
import { useExercises, actionTypes } from "../../contexts/ExercisesContext";
import { useModal } from "../../contexts/ModalContext";
import {
  Select,
  MenuItem,
  IconButton,
  InputLabel,
  Tooltip,
} from "@material-ui/core";
import { Edit, DeleteForever, Add } from "@material-ui/icons";
import modalTypes from "../Modals/modalTypes";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledAddIconButton = styled(IconButton)`
  @keyframes shine {
    from {
      transform: scale(0.9) translateZ(0px);
    }
    to {
      background-color: #f50057;
      transform: scale(1.1) translateZ(0px);
    }
  }
  border-radius: 50%;
  animation: ${({ shine }) => shine && "shine 2s alternate infinite"};
`;

const ExercisesPlansManager = () => {
  const { exercises, dispatch } = useExercises();
  const { setCurrentModal, closeModal } = useModal();
  const noPlans = !Object.keys(exercises.plans).length;
  const EMPTY_PLAN = "EMPTY_PLAN";

  const handlePlanChange = (e) => {
    const value = e.target.value;
    if (value === EMPTY_PLAN) return;
    dispatch({
      type: actionTypes.SET_CURRENT_PLAN,
      payload: value,
    });
  };

  const showEditPlanModal = () => {
    setCurrentModal({
      type: modalTypes.SINGLE_INPUT,
      title: "Edit plan name",
      inputLabel: "New name",
      inputPlaceholder: "e.g Morning stretching",
      initialValues: {
        planName: exercises.current,
      },
      closeButtonText: "Cancel",
      onClose: closeModal,
      validate: (values) => {
        const errors = {};
        if (!values.planName.length) {
          errors.planName = "Please, provide plan name";
        }
        //check if other plans incudes new name
        else if (
          Object.keys(exercises.plans)
            .filter((el) => el !== exercises.current)
            .includes(values.planName)
        ) {
          errors.planName = "This plan with this name already exists";
        }
        return errors;
      },
      confirmButtonText: "Change",
      onConfirm: ({ planName }) => {
        if (planName === exercises.current) {
          closeModal();
          return;
        }
        dispatch({
          type: actionTypes.EDIT_CURRENT_PLAN_NAME,
          payload: planName,
        });
        closeModal();
      },
    });
  };

  const showAddPlanModal = () => {
    setCurrentModal({
      type: modalTypes.SINGLE_INPUT,
      title: "Add plan",
      inputLabel: "Name",
      inputPlaceholder: "e.g Morning stretching",
      initialValues: {
        planName: "",
      },
      closeButtonText: "Cancel",
      onClose: closeModal,
      validate: (values) => {
        const errors = {};
        if (!values.planName.length) {
          errors.planName = "Please, provide plan name";
        } else if (Object.keys(exercises.plans).includes(values.planName)) {
          errors.planName = "This plan with this name already exists";
        }
        return errors;
      },
      confirmButtonText: "Add",
      onConfirm: ({ planName }) => {
        dispatch({
          type: actionTypes.CREATE_PLAN,
          payload: planName,
        });
        dispatch({
          type: actionTypes.SET_CURRENT_PLAN,
          payload: planName,
        });
        closeModal();
      },
    });
  };

  const DeletePlanModalContent = (
    <>
      <div>Are You sure You want to delete this plan?</div>{" "}
      <b>{exercises.current}</b>
    </>
  );
  const showDeletePlanModal = () => {
    setCurrentModal({
      type: modalTypes.CONFIRM,
      title: "Delete plan",
      content: DeletePlanModalContent,
      closeButtonText: "Cancel",
      onClose: closeModal,
      confirmButtonText: "Delete",
      onConfirm: () => {
        dispatch({
          type: actionTypes.DELETE_CURRENT_PLAN,
        });
        closeModal();
      },
    });
  };

  return (
    <StyledWrapper>
      <InputLabel style={{ fontSize: "1.3rem" }} id="selectLabel" shrink>
        {!exercises.current ? "No plan selected" : "Current plan:"}
      </InputLabel>
      <div>
        <Select
          onChange={handlePlanChange}
          value={exercises.current || EMPTY_PLAN}
          variant="outlined"
          style={{ width: "150px" }}
          labelId="selectLabel"
        >
          {noPlans ? (
            <MenuItem value={EMPTY_PLAN}>No plans</MenuItem>
          ) : (
            Object.keys(exercises.plans).map((name) => (
              <MenuItem value={name} key={exercises.plans[name].id}>
                {name}
              </MenuItem>
            ))
          )}
        </Select>
        <div>
          <Tooltip title="Edit plan name">
            <span>
              <IconButton disabled={noPlans} onClick={showEditPlanModal}>
                <Edit />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Delete current plan">
            <span>
              <IconButton disabled={noPlans} onClick={showDeletePlanModal}>
                <DeleteForever />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Add new plan">
            <StyledAddIconButton
              onClick={showAddPlanModal}
              shine={noPlans ? 1 : 0}
            >
              <Add fontSize={noPlans ? "large" : "default"} />
            </StyledAddIconButton>
          </Tooltip>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default ExercisesPlansManager;
