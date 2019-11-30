import React, { useContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../utils/theme";
import { MenuContext } from "../contexts/MenuContext";
import { Link } from "gatsby";
import { bottomMenu } from "../translations";
import { SettingsContext } from "../contexts/SettingsContext";
import { menuHeight } from "../utils/constants";

const BottomMenu = styled.div`
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
  opacity: ${({ menuShown }) => (menuShown ? 1 : 0)};
  transform: scaleY(${({ menuShown }) => (menuShown ? 1 : 0)});
  transform-origin: bottom;
  transition: opacity 1s ease, transform 0.5s ease;
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

const Layout = ({ children }) => {
  const { menuShown } = useContext(MenuContext);
  const {
    settings: { currentLanguage },
  } = useContext(SettingsContext);
  return (
    <ThemeProvider theme={theme}>
      <>
        {children}
        <BottomMenu menuShown={menuShown}>
          <StyledLink to="/" activeClassName="page-active">
            {bottomMenu.overwiew[currentLanguage]}
          </StyledLink>
          <StyledLink to="/training" activeClassName="page-active">
            {bottomMenu.training[currentLanguage]}
          </StyledLink>
        </BottomMenu>
      </>
    </ThemeProvider>
  );
};

export default Layout;
