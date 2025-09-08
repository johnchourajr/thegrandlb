"use client";

import { useEffect, useState } from "react";

import clsx from "clsx";
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

import { useModalContext } from "@/contexts/ModalContext";

/**
 * Hooks & Utils
 */
import useMediaQuery from "@/hooks/useMediaQuery";
import { clampBuilder } from "@/utils/utils";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

import type { HeaderProps } from "../types/layout";

export default function Header({ navigation }: HeaderProps) {
  const [navScrolled, setNavScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isMobile = useMediaQuery(1024);
  const { scrollY } = useScroll();
  const { modalOverlay } = useModalContext();
  const controls = useAnimation();

  useMotionValueEvent(scrollY, "change", (currentScrollY) => {
    setNavScrolled(currentScrollY > 0);
  });

  const variants = {
    initial: {
      "--navTop": "0",
      "--logoScale": 1,
      "--logoHeight": "3rem",
      "--logoHeight-lg": "6rem",
      "--logoY": ".125rem",
      "--logoY-lg": ".25rem",
      backgroundColor: "inherit",
      color: "unset",
      y: 0,
      transition: { duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0 },
    },
    scrolled: {
      "--navTop": "-1rem",
      "--logoScale": 0.75,
      "--logoHeight": "3rem",
      "--logoHeight-lg": "5rem",
      "--logoY": ".125rem",
      "--logoY-lg": ".25rem",
      backgroundColor: "inherit",
      color: "unset",
      y: 0,
      transition: { duration: 1, ease: [0.19, 1, 0.22, 1] },
    },
    modal: {
      "--navTop": "-2rem",
      "--logoScale": 0.75,
      "--logoHeight": "3rem",
      "--logoHeight-lg": "5rem",
      "--logoY": ".125rem",
      "--logoY-lg": ".25rem",
      backgroundColor: "transparent",
      color: "white",
      y: 0,
    },
  };

  useEffect(() => {
    if (navScrolled) {
      controls.start("scrolled");
    } else if (modalOverlay) {
      controls.start("modal");
    } else {
      controls.start("initial");
    }
  }, [navScrolled, modalOverlay, controls]);

  const gap = clampBuilder(1280, 1920, 0, 8);

  return (
    <motion.header
      id={"header"}
      className={clsx(
        "mx-auto w-full max-w-[2500px] gap-4 lg:gap-6",
        "sticky top-[--navTop] z-[9999] h-fit !max-w-[100vw] overflow-visible !pt-4",
        "transition-colors duration-300 ease-out-expo",
        "flex flex-col items-center md:gap-[inherit] lg:flex-row lg:gap-[--navGap]",
        "text-black",
        /**
         * NAV SCROLLED STYLES
         */
        navScrolled || isNavOpen ? "border-b-2 border-red bg-bg" : "bg-bg",
        /**
         * PRINT STYLES
         */
        "print:relative print:min-h-[50vh] print:!border-none print:!opacity-100"
      )}
      variants={variants}
      initial="initial"
      animate={controls}
      transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
      style={
        {
          "--navGap": gap,
        } as any
      }
    >
      <HeaderLeft
        isMobile={isMobile}
        isNavOpen={isNavOpen}
        setIsNavOpen={setIsNavOpen}
        controls={controls}
      />
      <HeaderRight
        isMobile={isMobile}
        isNavOpen={isNavOpen}
        navigation={navigation}
        setIsNavOpen={setIsNavOpen}
      />
    </motion.header>
  );
}
