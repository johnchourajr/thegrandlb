import clsx from "clsx";
import { AnimatePresence, m } from "framer-motion";
import Headline from "./Headline";
import Link from "./Link";
import HeaderLogo from "./svg/HeaderLogo";

export const HeaderLeft = ({
  isMobile,
  isNavOpen,
  setIsNavOpen,
  controls,
  modalOverlay,
  modalContent,
}: any) => {
  const { subtitle } = modalContent();

  return (
    <m.div
      className={clsx(
        "grid-inset relative z-10 flex w-full justify-between lg:w-auto",
        /**
         * PRINT STYLES
         */
        "print:h-full print:w-full print:grow print:items-end print:justify-center"
      )}
      initial={{ transformOrigin: "0% 70%" } as any}
      animate={controls}
    >
      <Link
        href="/"
        title="The Grand LB"
        aria-label="homepage"
        className={clsx("flex flex-nowrap items-center justify-center")}
        eventLabel="nav_logo"
      >
        <HeaderLogo
          className={clsx(
            // "h-12 lg:h-32",
            "h-[--logoHeight] lg:h-[--logoHeight-lg]",
            "aspect-[250/93]",
            "translate-y-[--logoY] lg:translate-y-[--logoY-lg]",
            "origin-left scale-[var(--logoScale)]",
            /**
             * PRINT STYLES
             */
            "print:h-32 print:w-64"
          )}
        />
        <AnimatePresence mode="sync">
          {modalOverlay && (
            <m.div
              initial={{ opacity: 0, y: -30, x: "0" }}
              animate={{ opacity: 1, y: "-12%", x: 0 }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
              exit={{ opacity: 0, y: -30, x: "0" }}
              className={clsx(" lg:absolute lg:right-[10%] lg:w-[0]")}
            >
              {subtitle && (
                <Headline
                  size={"sm"}
                  className="hidden !whitespace-pre md:flex"
                  animationType={"word"}
                  uppercase
                >
                  {subtitle}
                </Headline>
              )}
            </m.div>
          )}
        </AnimatePresence>
      </Link>
      {isMobile && !modalOverlay && (
        <div
          className={clsx(
            "col-span-1 col-start-4 row-start-1 flex justify-self-end lg:mr-16",
            /**
             * PRINT STYLES
             */
            "print:hidden"
          )}
        >
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className=" flex h-11 w-11 items-center justify-center bg-[yelllow]"
            aria-label="open navigation"
            title="open navigation"
          >
            {isNavOpen ? (
              <>
                <m.div
                  layoutId="nav-upper-line"
                  className={clsx("absolute h-[2px] w-6 bg-black")}
                  animate={{
                    rotate: "45deg",
                    y: "0rem",
                  }}
                />
                <m.div
                  layoutId="nav-lower-line"
                  className={clsx("absolute h-[2px] w-6 bg-black")}
                  animate={{
                    rotate: "-45deg",
                    y: "0rem",
                  }}
                />
              </>
            ) : (
              <>
                <m.div
                  layoutId="nav-upper-line"
                  className={clsx("absolute h-[2px] w-6 bg-black")}
                  animate={{
                    rotate: "0deg",
                    y: "-0.25rem",
                  }}
                />
                <m.div
                  layoutId="nav-lower-line"
                  className={clsx("absolute h-[2px] w-6 bg-black")}
                  animate={{
                    rotate: "0deg",
                    y: "0.25rem",
                  }}
                />
              </>
            )}
          </button>
        </div>
      )}
    </m.div>
  );
};

export default HeaderLeft;
