import clsx from "clsx";
import { AnimatePresence, m } from "framer-motion";
import Button from "./Button";
import { NavParentItem } from "./NavParentItem";
import Star from "./svg/Star";

export const HeaderRight = ({
  navigation,
  isNavOpen,
  setIsNavOpen,
  modalOverlay,
  isMobile,
  modalContent,
}: any) => {
  const { data } = navigation.results[0];
  const { title, subtitle, button, buttonAction } = modalContent();

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

  const AnimatedNav = isMobile ? m.nav : "nav";

  const animationProps = isMobile && {
    initial: isMobile ? "closed" : "open",
    variants: isMobile ? variants : {},
    animate: isNavOpen ? "open" : "closed",
  };

  return (
    <AnimatePresence>
      {!modalOverlay && (
        <AnimatedNav
          className={clsx(
            "group-one grid-inset overflow-hidden xl:overflow-visible",
            "col-span-full row-start-2 flex w-full grow flex-col items-center justify-between xl:gap-4",
            "xl:col-span-9 xl:col-start-4 xl:row-start-1 xl:flex-row xl:!pl-0",
            "h-0 opacity-0 xl:h-fit xl:opacity-100"
          )}
          {...animationProps}
        >
          {data.slices.map(
            ({ variation, primary, ...rest }: any, index: number) => {
              if (primary.show === false) return null;
              return (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1,
                    ease: [0.19, 1, 0.22, 1],
                    delay: 0.4,
                  }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <NavParentItem
                    link_source={primary.link_source}
                    link_title={primary.link_title}
                    show={primary.show}
                    variation={variation}
                    isNavOpen={isNavOpen}
                    setIsNavOpen={setIsNavOpen}
                    {...rest}
                  />
                </m.div>
              );
            }
          )}
          <Star
            className={clsx("z-10")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
            exit={{ opacity: 0, y: 20 }}
          />
          <m.span
            className="z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
            exit={{ opacity: 0, y: 20 }}
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
              className="z-10 w-[12rem]"
              text="Make an inquiry"
            />
          </m.span>
        </AnimatedNav>
      )}
      {modalOverlay && (
        <m.span
          className="grid-inset absolute top-5 z-10 flex w-full justify-end xl:relative xl:top-[unset]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          exit={{ opacity: 0, y: -30 }}
        >
          <Button
            onClick={buttonAction}
            size="small"
            target="_self"
            text={button}
          />
        </m.span>
      )}
    </AnimatePresence>
  );
};

export default HeaderRight;
