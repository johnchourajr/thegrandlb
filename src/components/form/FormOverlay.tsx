"use client";

import { useModalContext } from "@/contexts/ModalContext";
import clsx from "clsx";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { FormOverlayProps } from "../../types/modal";
import MapContainer from "../MapContainer";
import { InquireFormContainer } from "./InquireFormContainer";
import InquireThanks from "./InquireThanks";

const FormOverlay = ({
  className,
  toggleModalOverlay,
  ...extra
}: FormOverlayProps) => {
  const [formInProgress, setFormInProgress] = useState(false);
  const { modalOverlay } = useModalContext();
  const pathname = usePathname();

  useEffect(() => {
    if (modalOverlay) {
      setFormInProgress(true);
    }
  }, [modalOverlay]);

  useEffect(() => {
    const bodyElement = document.querySelector("body");
    if (modalOverlay) {
      bodyElement?.classList.add("modal-open");
    } else {
      bodyElement?.classList.remove("modal-open");
    }

    return () => {
      bodyElement?.classList.remove("modal-open");
    };
  }, [modalOverlay, pathname]);

  const getContent = useCallback(() => {
    switch (pathname) {
      case "/inquire":
        return <InquireFormContainer {...extra} />;
      case "/thanks":
        return <InquireThanks {...extra} />;
      case "/map":
        return <MapContainer {...extra} />;
      default:
        return "";
    }
  }, [pathname, extra]);

  return (
    <motion.div
      id="form-overlay"
      className={clsx(
        "header-height inset-grid-gutter fixed bottom-0 left-0 z-40",
        className
      )}
      variants={{
        initial: {
          y: "100vh",
          inset: 0,
          top: 0,
          bottom: 0,
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
        },
        animate: {
          y: 0,
          inset: [0, "var(--inset)"],
          top: "var(--header-height)",
          bottom: 0,
          borderTopRightRadius: ".5rem",
          borderTopLeftRadius: ".5rem",
        },
      }}
      transition={{
        ease: [0.19, 1, 0.22, 1],
        duration: 1,
      }}
      initial="initial"
      animate={modalOverlay ? "animate" : "initial"}
      data-modal-overlay={modalOverlay}
    >
      {getContent()}
    </motion.div>
  );
};

export default FormOverlay;
