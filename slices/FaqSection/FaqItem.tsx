import { BasicRichText } from "@/components/BasicRichText";
import Headline from "@/components/Headline";
import MotionBox from "@/components/MotionBox";
import * as prismicH from "@prismicio/helpers";
import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";
import { m } from "framer-motion";
import { useState } from "react";

export const FaqItem = ({ question, answer, open }: any) => {
  const [isOpen, setIsOpen] = useState(open || false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <MotionBox
      className={clsx(
        "relative flex w-full flex-col border-t-2 border-white pt-8 pb-8 text-left",
        "last-of-type:border-b-2"
      )}
    >
      <button
        className={clsx(
          "relative flex w-full items-center text-left",
          "after:bg-transparent after:absolute after:-inset-2 after:z-[-1] after:rounded-2xl after:transition-all after:duration-500 after:ease-out-expo after:content-['']"
        )}
        onClick={toggleOpen}
      >
        {prismicH.asText(question) && (
          <PrismicRichText
            field={question}
            components={{
              paragraph: ({ children }) => (
                <Headline
                  size={"sm"}
                  as="span"
                  className="max-w-[80%]"
                  animateOnce
                  disableMotion
                >
                  {children}
                </Headline>
              ),
            }}
          />
        )}
        <m.span
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="absolute right-0 flex h-8 w-8 items-center justify-center rounded-full "
        >
          <m.span className="absolute h-[2px] w-6 bg-black" />
          <m.span
            variants={{ closed: { rotate: -90 }, open: { rotate: 0 } }}
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="absolute h-[2px] w-6 rotate-90 bg-black"
          />
        </m.span>
      </button>
      <m.div
        variants={{
          open: {
            height: "auto",
            opacity: 1,
            marginTop: "1rem",
          },
          closed: {
            height: 0,
            opacity: 0,
            marginTop: "0rem",
            transitionEnd: { display: "none" },
          },
        }}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className="relative max-w-[90%] overflow-hidden will-change-transform"
      >
        {prismicH.asText(answer) && (
          <div className="mb-2 mt-4 whitespace-pre-wrap leading-[2] last:mb-0 ">
            <BasicRichText field={answer} paragraphSize="large" />
          </div>
        )}
      </m.div>
    </MotionBox>
  );
};
