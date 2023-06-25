import clsx from "clsx";
import { m } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MapContainer from "../MapContainer";
import InquireFormContainer from "./InquireFormContainer";
import InquireThanks from "./InquireThanks";

const FormOverlay = ({
  className,
  toggleModalOverlay,
  modalOverlay,
  ...extra
}: any) => {
  const [formInProgress, setFormInProgress] = useState(false);
  const { pathname } = useRouter();

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
  }, [modalOverlay]);

  const getContent = () => {
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
  };

  return (
    <>
      <Head>
        <style>{`
          body.modal-open {
            overflow: hidden;
          }
        `}</style>
      </Head>
      <m.div
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
      >
        {getContent()}
      </m.div>
    </>
  );
};

export default FormOverlay;
