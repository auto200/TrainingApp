import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { IconButton, Tooltip } from "@material-ui/core";
import { useExercises, actionTypes } from "../../contexts/ExercisesContext";
import { useModal } from "../../contexts/ModalContext";
import { Draggable } from "react-beautiful-dnd";
import modalTypes from "../Modals/modalTypes";
import { TYPES as innerTypes } from "../Modals/modals/AddOrEditExerciseModal";
import {
  FitnessCenter,
  Restore,
  DeleteForever,
  Edit,
} from "@material-ui/icons";

const MotionStyledListItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 1.5rem;
`;
const InfoContainder = styled.div`
  flex-grow: 2;
  display: flex;
  flex-wrap: wrap;
`;
const Name = styled.div`
  &::first-letter {
    text-transform: uppercase;
  }
`;

const getItemStyle = (isDragging, draggableStyle) => {
  // refference: https://codesandbox.io/s/vertical-list-txfzj
  const { transform } = draggableStyle;
  let activeTransform = {};
  if (transform) {
    activeTransform = {
      transform: `translate(0, ${transform.substring(
        transform.indexOf(",") + 1,
        transform.indexOf(")")
      )})`,
    };
  }
  return {
    // change background colour if dragging
    background: isDragging && "#2c3e50",
    borderRadius: isDragging && "15px",

    // styles we need to apply on draggables

    ...draggableStyle,
    ...activeTransform,
  };
};

const ExerciseItem = React.memo(({ id, name, index, duration, rest }) => {
  console.log("rerender");
  const { dispatch } = useExercises();
  const { setCurrentModal, closeModal } = useModal();

  const DeleteExerciseModalContent = (
    <>
      <div>Delete exercise</div> <b>{name}</b>
    </>
  );
  const showDeleteExerciseModal = () => {
    setCurrentModal({
      type: modalTypes.CONFIRM,
      title: "Delete exercise",
      content: DeleteExerciseModalContent,
      closeButtonText: "Cancel",
      onClose: closeModal,
      confirmButtonText: "Delete",
      onConfirm: () => {
        dispatch({
          type: actionTypes.DELETE_EXERCISE,
          payload: id,
        });
        closeModal();
      },
    });
  };
  const showEditExerciseModal = () => {
    setCurrentModal({
      type: modalTypes.ADD_OR_EDIT,
      config: {
        id,
        type: innerTypes.EDIT,
      },
      onClose: closeModal,
    });
  };

  const itemVariants = {
    start: {
      x: -50,
      opacity: 0,
    },
    end: {
      x: 0,
      opacity: 1,
    },
  };
  const layoutTransition = {
    type: "spring",
    stiffness: 200,
    damping: 20,
  };

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <MotionStyledListItem
            variants={itemVariants}
            transition={{ ease: "easeOut" }}
            exit={{ opacity: 0, x: "-100%" }}
            // smooth transisition when removing item.
            layoutTransition={snapshot.isDragging ? null : layoutTransition}
          >
            <InfoContainder>
              <Name>{name}:&nbsp;</Name>
              <div style={{ display: "flex" }}>
                <FitnessCenter />
                {duration}s |&nbsp;
                <Restore />
                {rest}s
              </div>
            </InfoContainder>
            <div style={{ display: "flex" }}>
              <Tooltip title="Edit exercise">
                <IconButton onClick={showEditExerciseModal}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete exercise">
                <IconButton onClick={showDeleteExerciseModal}>
                  <DeleteForever />
                </IconButton>
              </Tooltip>
            </div>
          </MotionStyledListItem>
        </div>
      )}
    </Draggable>
  );
});

export default ExerciseItem;
