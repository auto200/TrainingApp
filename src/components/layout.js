import React, { useContext } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "../utils/theme";
import { MenuContext } from "../contexts/MenuContext";
import { Link } from "gatsby";

const GlobalStyle = createGlobalStyle`
html{
  background-color: #222831;
  color: white;
}
body,html{
  margin: 0;
  padding: 0;
}

*,*::before,*::after{
  box-sizing: border-box;
}
`;
const BottomMenu = styled.div`
  position: sticky;
  overflow: hidden;
  bottom: 0;
  left: 0;
  height: 80px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.lightBlue};
  z-index: 111;
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
  opacity: ${({ menuShown }) => (menuShown ? 1 : 0)};
  transform: scale(${({ menuShown }) => (menuShown ? 1 : 0)});
  transition: opacity 1s ease;
`;
const StyledLink = styled(Link)`
  font-size: 1.5rem;
  text-decoration: none;
  flex-grow: 1;
  flex-basis: 0;
  text-align: center;
  height: 100%;
  line-height: 80px;
  color: ${({ theme }) => theme.colors.white};
  &.page-active {
    background-color: ${({ theme }) => theme.colors.darkBlue};
    font-size: 1.8rem;
  }
`;

const Layout = ({ children }) => {
  const { menuShown } = useContext(MenuContext);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
      <BottomMenu menuShown={menuShown}>
        <StyledLink to="/" activeClassName="page-active">
          overwiew
        </StyledLink>
        <StyledLink to="/training" activeClassName="page-active">
          training
        </StyledLink>
      </BottomMenu>
    </ThemeProvider>
  );
};

export default Layout;
