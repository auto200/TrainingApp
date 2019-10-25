import React, { useState, useContext } from "react";
import styled from "styled-components";
import uuid from "uuid/v4";
import { MenuContext } from "../contexts/MenuContext";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  & label {
    font-size: 1.4rem;
  }
`;
const Input = styled.input`
  width: 300px;
  font-size: 2rem;
  outline: none;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.colors.lightBlue};
  padding: 8px;
  margin-top: 2px;
  margin-bottom: 8px;
  &:focus {
    border-color: ${({ theme }) => theme.colors.darkBlue};
    box-shadow: 0 0 4px 0 ${({ theme }) => theme.colors.darkBlue};
  }
`;

const AddExerciseButton = styled.button`
  font-size: 2rem;
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.green};
  color: ${({ theme }) => theme.colors.orange};
`;

const AddExerciseSection = ({ setExercises }) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(30);
  const [rest, setBreakAfter] = useState(5);
  const handleNameChange = e => {
    setName(e.target.value);
  };
  const handleDurationChange = e => {
    setDuration(e.target.value);
  };
  const handleRestChange = e => {
    setBreakAfter(e.target.value);
  };
  const handleAddExercise = () => {
    if (name.length < 0 || Number(duration) < 0 || Number(rest) < 0) return;
    setExercises(prev => [
      ...prev,
      {
        name,
        duration: duration * 1000,
        rest: rest * 1000,
        id: uuid(),
      },
    ]);
    setName("");
  };
  const { hideMenu, showMenu } = useContext(MenuContext);
  return (
    <Wrapper>
      <div>
        <label>
          Name:
          <br />
          <Input
            type="text"
            value={name}
            onChange={handleNameChange}
            onFocus={hideMenu}
            onBlur={showMenu}
            placeholder="Exercise name"
          />
        </label>
      </div>
      <div>
        <label>
          Duration (s):
          <br />
          <Input
            type="number"
            value={duration}
            onChange={handleDurationChange}
            onFocus={hideMenu}
            onBlur={showMenu}
            min={0}
          />
        </label>
      </div>
      <div>
        <label>
          Rest (s):
          <br />
          <Input
            type="number"
            value={rest}
            onChange={handleRestChange}
            onFocus={hideMenu}
            onBlur={showMenu}
            min={0}
          />
        </label>
      </div>
      <AddExerciseButton onClick={handleAddExercise}>
        Add exercise
      </AddExerciseButton>
    </Wrapper>
  );
};

export default AddExerciseSection;
