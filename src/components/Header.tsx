import { useEffect, useState } from "react";

import clsx from "clsx";
import { useAnimation, useMotionValueEvent, useScroll } from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

/**
 * Hooks & Utils
 */
import useMediaQuery from "@/hooks/useMediaQuery";
import { clampBuilder } from "@/utils/utils";

/**
 * Dynamic Components
 */
const DynamicGridSection = dynamic(() => import("./GridSection"), {
  ssr: false,
});
const DynamicHeaderLeft = dynamic(() => import("./HeaderLeft"), {
  ssr: false,
});
const DynamicHeaderRight = dynamic(() => import("./HeaderRight"), {
  ssr: false,
});

export default function Header({
  navigation,
  toggleModalOverlay,
  modalOverlay,
}: any) {
  const [navScrolled, setNavScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isMobile = useMediaQuery(1024);
  const { scrollY } = useScroll();
  const router = useRouter();

  const controls = useAnimation();

  const getModalHeaderContent = () => {
    switch (router.pathname) {
      case "/inquire":
        return {
          title: "Inquire",
          subtitle: "Let's Talk",
          showInquire: false,
          button: "Close",
          buttonAction: toggleModalOverlay,
        };
      case "/thanks":
        return {
          title: "Inquire",
          subtitle: "",
          showInquire: false,
          button: "Close",
          buttonAction: toggleModalOverlay,
        };
      case "/map":
        return {
          title: "Map",
          subtitle: "Interactive Map",
          showInquire: true,
          button: "Close",
          buttonAction: toggleModalOverlay,
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

  useMotionValueEvent(scrollY, "change", (currentScrollY) => {
    setNavScrolled(currentScrollY > 10);
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

  if (!navigation) return null;

  const gap = clampBuilder(1280, 1920, 0, 8);

  return (
    <DynamicGridSection
      id={"header"}
      gridSectionType="flex"
      className={clsx(
        "sticky top-[--navTop] z-[9999] h-fit !max-w-[100vw] overflow-visible !pt-4",
        "transition-colors duration-300 ease-out-expo",
        "flex-col items-center md:gap-[inherit] lg:flex-row lg:gap-[--navGap]",
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
      topSpacer="None"
      bottomSpacer="None"
      overflowHidden={false}
      style={
        {
          "--navGap": gap,
        } as any
      }
    >
      <DynamicHeaderLeft
        isMobile={isMobile}
        isNavOpen={isNavOpen}
        setIsNavOpen={setIsNavOpen}
        controls={controls}
        modalOverlay={modalOverlay}
        modalContent={getModalHeaderContent}
      />
      <DynamicHeaderRight
        isMobile={isMobile}
        isNavOpen={isNavOpen}
        navigation={navigation}
        setIsNavOpen={setIsNavOpen}
        modalOverlay={modalOverlay}
        modalContent={getModalHeaderContent}
      />
    </DynamicGridSection>
  );
}
