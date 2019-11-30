import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { bottomMenu } from "../translations";
import { SettingsContext } from "../contexts/SettingsContext";
import { menuHeight } from "../utils/constants";

const StyledContainer = styled.div`
  position: fixed;
  overflow: hidden;
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
  const {
    settings: { currentLanguage },
  } = useContext(SettingsContext);
  return (
    <StyledContainer>
      <StyledLink to="/" activeClassName="page-active">
        {bottomMenu.overwiew[currentLanguage]}
      </StyledLink>
      <StyledLink to="/training" activeClassName="page-active">
        {bottomMenu.training[currentLanguage]}
      </StyledLink>
    </StyledContainer>
  );
};

export default BottomMenu;
