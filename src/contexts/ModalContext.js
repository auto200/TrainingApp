import React, { createContext, useState } from "react";

export const ModalContext = createContext();

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
