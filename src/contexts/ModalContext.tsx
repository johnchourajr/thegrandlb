"use client";

import { ModalRoute, useModalOverlay } from "@/hooks/useModalOverlay";
import { createContext, ReactNode, useContext } from "react";

type ModalContextType = {
  modalOverlay: boolean;
  openOverlay: (route: ModalRoute) => void;
  closeOverlay: () => void;
  toggleModalOverlay: (route: ModalRoute) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};

type ModalProviderProps = {
  children: ReactNode;
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const modalState = useModalOverlay();

  return (
    <ModalContext.Provider value={modalState}>{children}</ModalContext.Provider>
  );
};
