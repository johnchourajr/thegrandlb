"use client";

import { useModalContext } from "@/contexts/ModalContext";
import { usePathname } from "next/navigation";

export const useModalHeaderContent = () => {
  const pathname = usePathname();
  const { modalOverlay, toggleModalOverlay, closeOverlay } = useModalContext();

  const getModalHeaderContent = () => {
    switch (pathname) {
      case "/inquire":
        return {
          title: "Inquire",
          subtitle: "Let's Talk",
          showInquire: false,
          button: "Close",
          buttonAction: (route: string) => toggleModalOverlay(route as any),
        };
      case "/thanks":
        return {
          title: "Inquire",
          subtitle: "",
          showInquire: false,
          button: "Close",
          buttonAction: (route: string) => toggleModalOverlay(route as any),
        };
      case "/map":
        return {
          title: "Map",
          subtitle: "Interactive Map",
          showInquire: true,
          button: "Close",
          buttonAction: (route: string) => toggleModalOverlay(route as any),
        };
      default:
        return {
          title: "",
          subtitle: "",
          showInquire: true,
          button: "",
          buttonAction: () => {},
        };
    }
  };

  return {
    modalOverlay,
    getModalHeaderContent,
  };
};
