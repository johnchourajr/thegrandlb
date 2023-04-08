import { useState, useRef } from "react";
import Link from "./Link";

import { useRouter } from "next/router";
import { PrismicLink } from "@prismicio/react";
import { linkResolver } from "../../prismicio";
import { m, useAnimation } from "framer-motion";
import clsx from "clsx";
import HeaderLogo from "./svg/HeaderLogo";
import { GridSection } from "./GridSection";
import useMediaQuery from "@/hooks/useMediaQuery";

const NavParentItem = ({
  href,
  link_source,
  link_title,
  items,
  ...rest
}: any) => {
  const router = useRouter();
  const controls = useAnimation();
  const [isHovering, setIsHovering] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const isMobile = useMediaQuery(1280);

  const link = href ? href : linkResolver(link_source);
  const activeLink = router.pathname.includes(link);
  const hasChildren = items.length > 1;

  const dropdownVariants = {
    open: {
      opacity: 1,
      y: 0,
      height: "auto",
      display: "flex",
      transition: {},
    },
    closed: {
      opacity: 0,
      y: 10,
      height: 0,
      transition: {},
    },
  };

  const handleHoverStart = () => {
    setIsHovering(true);
    controls.start(dropdownVariants?.open);
  };

  const handleHoverEnd = () => {
    setIsHovering(false);
    controls.start(dropdownVariants?.closed);
  };

  const desktopParentProps = !isMobile && {
    onHoverStart: handleHoverStart,
    onHoverEnd: handleHoverEnd,
  };

  const CategoryAction: any = isMobile && hasChildren ? "button" : PrismicLink;

  const categoryActionProps = () => {
    if (isMobile && hasChildren) {
      return {
        onClick: handleToggleControls,
      };
    } else {
      return {
        linkResolver,
        field: link_source,
      };
    }
  };

  const handleToggleControls = () => {
    setIsControlsVisible(!isControlsVisible);
    if (isHovering && !isControlsVisible) {
      controls.start(dropdownVariants.closed);
      setIsHovering(false);
    } else {
      controls.start(dropdownVariants.open);
      setIsHovering(true);
    }
  };

  return (
    <m.li className={clsx("--bg-yellow-400 list-none")} {...desktopParentProps}>
      <span className={clsx("relative flex justify-between xl:justify-start")}>
        <CategoryAction
          tabIndex={1}
          className={clsx(activeLink && "underline", "flex-grow text-left")}
          {...categoryActionProps()}
        >
          {link_title}
        </CategoryAction>
        {hasChildren && (
          <span>
            <button
              className={clsx(
                "flex w-6 flex-row items-center justify-center !no-underline"
              )}
              onClick={handleToggleControls}
              tabIndex={1}
            >
              {isHovering ? "-" : "+"}
            </button>
          </span>
        )}
      </span>

      {hasChildren && (
        <m.ul
          className={clsx(
            "flex flex-col gap-1 overflow-hidden bg-green-400 xl:absolute xl:overflow-visible xl:pt-2",
            !isHovering && "pointer-events-none"
          )}
          initial={"closed"}
          animate={controls}
          variants={dropdownVariants}
        >
          <m.li>
            <PrismicLink
              linkResolver={linkResolver}
              field={link_source}
              tabIndex={1}
            >
              {link_title} Overview
            </PrismicLink>
          </m.li>
          {items.map(
            ({ child_link_title, child_link_source }: any, index: number) => {
              return (
                <m.li key={index}>
                  <PrismicLink
                    linkResolver={linkResolver}
                    field={child_link_source}
                    tabIndex={1}
                  >
                    {child_link_title}
                  </PrismicLink>
                </m.li>
              );
            }
          )}
        </m.ul>
      )}
    </m.li>
  );
};

export default function Header({ navigation }: any) {
  // nav menu state
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isMobile = useMediaQuery(1280);

  const { data } = navigation.results[0];

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
    <GridSection className="items-center bg-blue-100 ">
      <div className={clsx("col-span-3 col-start-1 row-start-1 ml-4 xl:ml-16")}>
        <Link href="/" title="The Grand LB">
          <HeaderLogo />
        </Link>
      </div>
      {isMobile && (
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
      <AnimatedNav
        className={clsx(
          "bg-red-200",
          "col-span-full row-start-2 mx-4 flex grow flex-col justify-between gap-4",
          "xl:col-span-9 xl:col-start-4 xl:row-start-1 xl:mr-16 xl:flex-row"
        )}
        {...animationProps}
      >
        {data.slices.map(
          ({ variation, primary, ...rest }: any, index: number) => {
            return (
              <NavParentItem
                key={index}
                link_source={primary.link_source}
                link_title={primary.link_title}
                variation={variation}
                {...rest}
              />
            );
          }
        )}
      </AnimatedNav>
    </GridSection>
  );
}
