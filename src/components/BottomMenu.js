import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { menuHeight } from "../utils/constants";
import menu_select from "../assets/menu_select.mp3";
import audioManager from "../utils/audioManager";

const StyledContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  height: ${menuHeight};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.lightBlue};
  z-index: 111;
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
`;
const StyledLink = styled(Link)`
  font-size: 1.5rem;
  text-decoration: none;
  flex-grow: 1;
  flex-basis: 0;
  text-align: center;
  height: 100%;
  line-height: ${menuHeight};
  color: ${({ theme }) => theme.colors.white};
  &.page-active {
    background-color: ${({ theme }) => theme.colors.darkBlue};
    font-size: 1.8rem;
  }
`;

const BottomMenu = () => {
  return (
    <StyledContainer>
      <StyledLink
        to="/"
        activeClassName="page-active"
        onClick={() => {
          audioManager.play(menu_select);
        }}
      >
        Overview
      </StyledLink>
      <StyledLink
        to="/training"
        activeClassName="page-active"
        onClick={() => {
          audioManager.play(menu_select);
        }}
      >
        Training
      </StyledLink>
    </StyledContainer>
  );
};

export default BottomMenu;
