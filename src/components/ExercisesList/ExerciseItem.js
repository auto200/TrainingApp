import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { exercisesList } from "../../translations";
import { IconButton, Tooltip } from "@material-ui/core";
import { SettingsContext } from "../../contexts/SettingsContext";
import { Draggable } from "react-beautiful-dnd";

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
  word-break: break-all;
`;
const Name = styled.div`
  &::first-letter {
    text-transform: uppercase;
  }
`;

const getItemStyle = (isDragging, draggableStyle) => {
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
    // refference: https://codesandbox.io/s/vertical-list-txfzj

    // some basic styles to make the items look a bit nicer
    // userSelect: "none",
    // padding: grid * 2,
    // margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging && "#2c3e50",

    // styles we need to apply on draggables

    ...draggableStyle,
    ...activeTransform,
  };
};

const ExerciseItem = React.memo(
  ({
    id,
    name,
    index,
    duration,
    requestDeleteExercise,
    openEditExerciseDialog,
    rest,
  }) => {
    const {
      settings: { currentLanguage },
    } = useContext(SettingsContext);
    const handleDeleteItem = () => requestDeleteExercise(id);
    const handleEditItem = () => openEditExerciseDialog(id);

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
            >
              <InfoContainder>
                <Name>{name}:&nbsp;</Name>
                <Tooltip
                  title={exercisesList.tooltips.timings[currentLanguage]}
                >
                  <div style={{ display: "flex" }}>
                    <FitnessCenter />
                    {duration}s |&nbsp;
                    <Restore />
                    {rest}s
                  </div>
                </Tooltip>
              </InfoContainder>
              <div style={{ display: "flex" }}>
                <Tooltip title={exercisesList.tooltips.edit[currentLanguage]}>
                  <IconButton onClick={handleEditItem}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title={exercisesList.tooltips.delete[currentLanguage]}>
                  <IconButton onClick={handleDeleteItem}>
                    <DeleteForever />
                  </IconButton>
                </Tooltip>
              </div>
            </MotionStyledListItem>
          </div>
        )}
      </Draggable>
    );
  }
);

export default ExerciseItem;
