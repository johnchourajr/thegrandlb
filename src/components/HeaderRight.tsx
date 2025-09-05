"use client";

import { useModalHeaderContent } from "@/hooks/useModalHeaderContent";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";
import { NavParentItem } from "./NavParentItem";
import Star from "./svg/Star";

export const HeaderRight = ({
  navigation,
  isNavOpen,
  setIsNavOpen,
  isMobile,
}: any) => {
  const { modalOverlay, getModalHeaderContent } = useModalHeaderContent();
  const { data } = navigation.results[0];
  const { button, buttonAction } = getModalHeaderContent();

  const variants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {},
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {},
    },
  };

  const AnimatedNav = isMobile ? motion.nav : "nav";

  const animationProps = isMobile && {
    initial: isMobile ? "closed" : "open",
    variants: isMobile ? variants : {},
    animate: isNavOpen ? "open" : "closed",
  };

  return (
    <AnimatePresence mode="sync">
      {!modalOverlay && (
        <AnimatedNav
          className={clsx(
            "group-one grid-inset overflow-hidden lg:overflow-visible",
            "col-span-full row-start-2 flex w-full grow flex-col items-center justify-between lg:gap-4",
            "2lg:!pl-16 3lg:!pl-[6vw] lg:col-span-9 lg:col-start-4 lg:row-start-1 lg:flex-row lg:!pl-0",
            "h-0 opacity-0 lg:h-fit lg:opacity-100",
            /**
             * PRINT STYLES
             */
            "print:hidden"
          )}
          {...animationProps}
        >
          {data.slices.map(
            ({ variation, primary, ...rest }: any, index: number) => {
              if (primary.show === false) return null;
              return (
                <NavParentItem
                  key={index}
                  link_source={primary.link_source}
                  link_title={primary.link_title}
                  show={primary.show}
                  variation={variation}
                  isNavOpen={isNavOpen}
                  setIsNavOpen={setIsNavOpen}
                  {...rest}
                />
              );
            }
          )}
          <Star
            className={clsx("z-10 my-4 lg:my-0")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
            exit={{ opacity: 0, y: 20 }}
          />
          <motion.span
            className="z-10 mb-4 w-full lg:mb-0 lg:w-fit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
          >
            <Button
              field={{
                id: "ZC5YBhAAACEA0ymB",
                link_type: "Document",
                slug: "inquire-page",
                type: "inquire_page",
                uid: "inquire",
              }}
              size="small"
              target="_self"
              className="z-10 w-full lg:w-[12rem] "
              text="Make an inquiry"
              eventCategory="nav_button"
              eventLabel="inquire"
            />
          </motion.span>
        </AnimatedNav>
      )}
      {modalOverlay && (
        <motion.span
          className="grid-inset absolute top-5 z-10 flex w-full justify-end lg:relative lg:top-[unset]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          exit={{ opacity: 0, y: -30 }}
        >
          <Button
            onClick={() => buttonAction("/inquire")}
            size="small"
            target="_self"
            text={button}
            eventCategory="nav_button"
            eventLabel="modal_action"
          />
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default HeaderRight;
