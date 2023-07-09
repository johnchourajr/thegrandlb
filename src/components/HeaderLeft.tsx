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
  const { title, subtitle, button, buttonAction } = modalContent();

  // console.log({ modalContent: modalContent() });

  return (
    <m.div
      className={clsx(
        "grid-inset relative z-10 flex w-full justify-between xl:w-auto"
      )}
      initial={{ "--logoScale": "1", transformOrigin: "0% 70%" } as any}
      animate={controls}
    >
      <Link
        href="/"
        title="The Grand LB"
        aria-label="homepage"
        className="flex flex-nowrap items-center justify-center"
        eventLabel="navLogo"
      >
        <HeaderLogo className="h-12 w-32 origin-left scale-[var(--logoScale)] xl:h-32 xl:w-64" />
        <AnimatePresence mode="sync">
          {modalOverlay && (
            <m.div
              initial={{ opacity: 0, y: -30, x: "0" }}
              animate={{ opacity: 1, y: "-12%", x: 0 }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
              exit={{ opacity: 0, y: -30, x: "0" }}
              className={clsx(" xl:absolute xl:right-[10%] xl:w-[0]")}
            >
              {subtitle && (
                <Headline
                  size={"sm"}
                  className="hidden !whitespace-pre lg:flex"
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
            "col-span-1 col-start-4 row-start-1 mr-4 flex justify-self-end xl:mr-16"
          )}
        >
          <button onClick={() => setIsNavOpen(!isNavOpen)}>
            {isNavOpen ? "Close" : "Open"}
          </button>
        </div>
      )}
    </m.div>
  );
};

export default HeaderLeft;
