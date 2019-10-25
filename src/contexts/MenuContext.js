import React, { createContext, useState } from "react";

export const MenuContext = createContext();

const MenuContextProvider = ({ children }) => {
  const [menuShown, setMenuShown] = useState(true);
  const hideMenu = () => setMenuShown(false);
  const showMenu = () => setMenuShown(true);

  const value = {
    menuShown,
    hideMenu,
    showMenu,
  };
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export default MenuContextProvider;
