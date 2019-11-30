import React from "react";
import styled from "styled-components";
import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import {} from "../translations";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Text = styled.div`
  color: ${({ theme }) => theme.colors.white};
  margin-right: 5px;
`;

const AddExerciseSection = ({ openDialog }) => {
  return (
    <StyledWrapper>
      <Text>Add new Exercise:</Text>
      <Fab color="secondary" onClick={openDialog}>
        <Add />
      </Fab>
    </StyledWrapper>
  );
};

export default AddExerciseSection;
