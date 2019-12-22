import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BottomMenu from "./BottomMenu";
import { ThemeProvider } from "styled-components";
import theme from "../utils/theme";
import GlobalStyle from "../utils/GlobalStyle";

const Layout = ({ children, location }) => {
  const previousLocation = useRef("");
  const { pathname } = location;

  useEffect(() => {
    previousLocation.current = pathname;
  }, [pathname]);
  console.log("prev path:", previousLocation.current);

  const variants = {
    left: {
      x: -1000,
      opacity: 0,
    },
    right: {
      x: 1000,
      opacity: 0,
    },
    center0: {
      x: 0,
      opacity: 0,
    },
    center1: {
      x: 0,
      opacity: 1,
    },
  };
  let initial = null;
  if (!previousLocation.current) initial = "center0";
  else if (pathname === "/") initial = "left";
  else {
    initial = "right";
  }
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <AnimatePresence exitBeforeEnter>
          <motion.main
            key={pathname}
            variants={variants}
            initial={initial}
            animate="center1"
            exit={{ opacity: 0 }}
            transition={{ easings: "linear" }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
        <BottomMenu />
      </>
    </ThemeProvider>
  );
};

export default Layout;
