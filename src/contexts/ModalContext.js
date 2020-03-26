import React, { createContext, useState, useContext } from "react";

const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {
  const [currentModal, setCurrentModal] = useState({});
  const closeModal = () => setCurrentModal({});
  return (
    <ModalContext.Provider
      value={{ currentModal, setCurrentModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;

export const useModal = () => useContext(ModalContext);
