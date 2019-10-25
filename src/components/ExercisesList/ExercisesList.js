import React from "react";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";

const ExercisesListWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.green + "aa"};
  height: 40vh;
  width: 90%;
  max-width: 550px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
const EmptyListWarning = styled.div`
  margin: auto;
  font-size: 2rem;
  text-align: center;
`;

const ExercisesList = ({ exercises, deleteExercise }) => {
  return (
    <ExercisesListWrapper>
      {exercises.length ? (
        exercises.map(exercise => (
          <ListItem
            key={exercise.id}
            id={exercise.id}
            name={exercise.name}
            duration={exercise.duration}
            rest={exercise.rest}
            deleteItem={deleteExercise}
          />
        ))
      ) : (
        <EmptyListWarning>
          There are no exercises yet. Fix it by adding them below!
        </EmptyListWarning>
      )}
    </ExercisesListWrapper>
  );
};

const StyledListItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-size: 1.5rem;
`;
const Name = styled.div`
  color: ${({ theme }) => theme.colors.ora};
  flex-grow: 2;
  &::first-letter {
    text-transform: uppercase;
  }
`;
const EditButton = styled.div`
  margin-right: 15px;
`;

const ListItem = React.memo(({ id, name, duration, deleteItem, rest }) => {
  console.log("list item updated");
  const handleDeleteItem = () => {
    deleteItem(id);
  };
  return (
    <StyledListItem>
      <Name>
        {name}: {duration / 1000}s | {rest / 1000}s
      </Name>
      <EditButton>edit</EditButton>
      <FaTrash onClick={handleDeleteItem} />
    </StyledListItem>
  );
});

export default ExercisesList;
