import { useEffect, useState } from "react";

import useMediaQuery from "@/hooks/useMediaQuery";
import { clampBuilder } from "@/utils/utils";
import clsx from "clsx";
import { useAnimation, useScroll } from "framer-motion";
import { useRouter } from "next/router";
import { GridSection } from "./GridSection";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

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
          subtitle: "Let’s Talk",
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

  useEffect(() => {
    const onChange = scrollY.on("change", async (currentScrollY) => {
      setNavScrolled(currentScrollY > 10);
    });

    return () => {
      onChange();
    };
  }, [scrollY]);

  useEffect(() => {
    if (navScrolled) {
      controls.start({
        "--navTop": "-1rem",
        "--logoScale": 0.8,
        backgroundColor: null,
        color: null,
        y: 0,
        transition: { duration: 1, ease: [0.19, 1, 0.22, 1] },
      } as any);
    } else if (modalOverlay) {
      controls.start({
        "--navTop": "-2rem",
        "--logoScale": 0.8,
        backgroundColor: "transparent",
        color: "white",
        y: 0,
      } as any);
    } else {
      controls.start({
        "--navTop": "0",
        "--logoScale": 1,
        backgroundColor: null,
        color: null,
        y: 0,
        transition: { duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0 },
      } as any);
    }
  }, [navScrolled, modalOverlay, controls]);

  if (!navigation) return null;

  const gap = clampBuilder(1280, 1920, 0, 14);

  return (
    <GridSection
      id={"header"}
      gridSectionType="flex"
      className={clsx(
        "sticky top-[var(--navTop)] z-[9999] h-fit !max-w-[100vw] overflow-visible !pt-4",
        "transition-colors duration-300 ease-out-expo",
        "flex-col items-center !gap-0 md:gap-[inherit] lg:flex-row lg:gap-[var(--navGap)]",
        /**
         * NAV SCROLLED STYLES
         */
        navScrolled || isNavOpen ? "border-b-2 border-red bg-bg" : "bg-bg",
        /**
         * PRINT STYLES
         */
        "print:relative print:min-h-[50vh] print:!border-none print:!opacity-100"
      )}
      initial={{ "--navTop": "0rem" } as any}
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
      <HeaderLeft
        isMobile={isMobile}
        isNavOpen={isNavOpen}
        setIsNavOpen={setIsNavOpen}
        controls={controls}
        modalOverlay={modalOverlay}
        modalContent={getModalHeaderContent}
      />
      <HeaderRight
        isMobile={isMobile}
        isNavOpen={isNavOpen}
        navigation={navigation}
        setIsNavOpen={setIsNavOpen}
        modalOverlay={modalOverlay}
        modalContent={getModalHeaderContent}
      />
    </GridSection>
  );
}
