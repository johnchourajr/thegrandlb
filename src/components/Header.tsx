import { useEffect, useState } from "react";
import Link from "./Link";

import useMediaQuery from "@/hooks/useMediaQuery";
import { PrismicLink } from "@prismicio/react";
import clsx from "clsx";
import { m, useAnimation, useScroll } from "framer-motion";
import { useRouter } from "next/router";
import { linkResolver } from "../../prismicio";
import Button from "./Button";
import { GridSection } from "./GridSection";
import StringText from "./StringText";
import HeaderLogo from "./svg/HeaderLogo";
import Star from "./svg/Star";

const NavItem = ({
  field,
  text,
  linkProps,
  linkClassName,
  show = true,
  className,
}: any) => {
  if (show === false) return null;
  return (
    <m.li className={clsx(className)}>
      <PrismicLink
        linkResolver={linkResolver}
        field={field}
        className={clsx("group relative z-10", linkClassName)}
        {...linkProps}
      >
        <StringText
          as="span"
          className={clsx(
            "inline-flex py-[0.65rem]",
            "after:absolute after:bottom-0 after:left-0 after:z-20 after:h-[1.5px] after:w-[100%] after:origin-top-right after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-out-expo after:content-['']",
            "group-hover:after:origin-top-left group-hover:after:scale-x-100"
          )}
        >
          {text}
        </StringText>
      </PrismicLink>
    </m.li>
  );
};

const NavParentItem = ({
  href,
  link_source,
  link_title,
  items,
  show = true,
  setIsNavOpen,
}: any) => {
  const router = useRouter();
  const controls = useAnimation();
  const [isHovering, setIsHovering] = useState(false);
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

  const onRouteChangeCloseMenu = () => {
    controls.start(dropdownVariants.closed);
    setIsHovering(false);
    setIsNavOpen(false);
  };

  useEffect(() => {
    router.events.on("routeChangeStart", onRouteChangeCloseMenu);
    return () => {
      router.events.off("routeChangeStart", onRouteChangeCloseMenu);
    };
  }, [router.events]);

  const handleToggleControls = () => {
    if (isHovering) {
      controls.start(dropdownVariants.closed);
      setIsHovering(false);
    } else {
      controls.start(dropdownVariants.open);
      setIsHovering(true);
    }
  };

  if (show === false) return null;

  return (
    <m.li
      className={clsx(
        "w-full list-none transition-opacity duration-300 ease-out-expo xl:w-fit",
        hasChildren &&
          "via-100% after:xl:pointer-events-none after:xl:absolute after:xl:inset-0 after:xl:top-0 after:xl:z-[1] after:xl:h-[110vh] after:xl:bg-gradient-to-b after:xl:from-bg after:xl:to-bg after:xl:opacity-0 after:xl:transition-opacity after:xl:duration-700 after:xl:ease-out-expo after:xl:content-[''] hover:after:xl:opacity-90"
      )}
      initial={!isMobile && ({ "--height": "50vh" } as any)}
      whileHover={!isMobile && ({ "--height": "100vh" } as any)}
      transition={{ duration: 0.3 }}
      {...desktopParentProps}
    >
      <span
        className={clsx(
          "relative flex justify-between xl:justify-start",
          "--bg-yellow-100 border-b-[1.5px] border-black py-3",
          "xl:border-none xl:py-0"
        )}
      >
        <CategoryAction
          tabIndex={1}
          className={clsx("group relative z-10 flex-grow text-left")}
          {...categoryActionProps()}
        >
          <StringText
            as="span"
            className={clsx(
              activeLink && "after:scale-x-100",
              "after:absolute after:bottom-0 after:left-0 after:z-10 after:h-[1.5px] after:w-[100%] after:origin-top-right after:scale-x-0 after:bg-black after:opacity-0 after:transition-transform after:duration-300 after:ease-out-expo after:content-[''] after:xl:opacity-100",
              "group-hover:opacity-100 group-hover:after:origin-top-left group-hover:after:scale-x-100"
            )}
          >
            {link_title}
          </StringText>
        </CategoryAction>
        {hasChildren && (
          <span className="z-10">
            <button
              className={clsx(
                "relative flex w-6 flex-row items-center justify-center !no-underline",
                "after:absolute after:left-[105%] after:top-0 after:rounded-sm after:p-3 after:py-2 focus-visible:after:bg-black focus-visible:after:text-white focus-visible:after:content-[attr(data-content)]"
              )}
              onClick={handleToggleControls}
              tabIndex={isMobile ? -1 : 1}
              data-content={isHovering ? "Close" : "Open"}
            >
              {isHovering ? "-" : "+"}
            </button>
          </span>
        )}
      </span>

      {hasChildren && (
        <m.ul
          className={clsx(
            "bg-green-400 flex flex-col overflow-hidden xl:absolute xl:overflow-visible xl:pt-2 xl:pb-4",
            "z-10 border-b-[1.5px] border-black",
            "xl:border-none",
            !isHovering && "pointer-events-none"
          )}
          initial={"closed"}
          animate={controls}
          variants={dropdownVariants}
        >
          <NavItem
            field={link_source}
            text={`${link_title} Overview`}
            linkProps={{
              tabIndex: isHovering ? 1 : -1,
            }}
            linkClassName={"group relative"}
            className={"pt-2"}
          />
          {items.map(
            (
              { child_link_title, child_link_source, show }: any,
              index: number
            ) => {
              if (show === false) return null;
              return (
                <NavItem
                  key={index}
                  field={child_link_source}
                  text={child_link_title}
                  show={show}
                  linkProps={{
                    tabIndex: isHovering ? 1 : -1,
                  }}
                  linkClassName={"group relative"}
                  className={"last-of-type:pb-2 last-of-type:xl:pb-0 "}
                />
              );
            }
          )}
        </m.ul>
      )}
    </m.li>
  );
};

export default function Header({ navigation }: any) {
  const [navScrolled, setNavScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isMobile = useMediaQuery(1280);
  const { scrollY } = useScroll();

  const controls = useAnimation();

  useEffect(() => {
    const onChange = scrollY.on("change", async (currentScrollY) => {
      setNavScrolled(currentScrollY > 100);
    });

    return () => {
      onChange();
    };
  }, [scrollY]);

  useEffect(() => {
    controls.start({
      "--navTop": navScrolled ? "-1rem" : "0",
      "--logoScale": navScrolled ? 0.8 : 1,
    } as any);
  }, [navScrolled, controls]);

  if (!navigation) return null;

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
    <GridSection
      id={"header"}
      gridSectionType="flex"
      className={clsx(
        "sticky top-[var(--navTop)] z-[9999] h-fit !max-w-[100vw] flex-col items-center gap-0 overflow-visible !pt-4 transition-colors duration-300 ease-out-expo lg:gap-[inherit] xl:flex-row xl:gap-[4vw] 2xl:gap-[5vw] 4xl:gap-[6vw]",
        navScrolled ? "border-b-2 border-red bg-bg" : "bg-bg"
      )}
      initial={{ "--navTop": "0rem" } as any}
      animate={controls}
      transition={{ duration: 0.2 }}
      topSpacer="None"
      bottomSpacer="None"
      overflowHidden={false}
    >
      <m.div
        className={clsx(
          "grid-inset z-10 flex w-full justify-between xl:w-auto"
        )}
        initial={{ "--logoScale": "1", transformOrigin: "0% 70%" } as any}
        animate={controls}
      >
        <Link href="/" title="The Grand LB">
          <HeaderLogo className="h-12 w-32 origin-left scale-[var(--logoScale)] xl:h-32 xl:w-64" />
        </Link>
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
      </m.div>
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
              <NavParentItem
                key={index}
                link_source={primary.link_source}
                link_title={primary.link_title}
                show={primary.show}
                variation={variation}
                setIsNavOpen={setIsNavOpen}
                {...rest}
              />
            );
          }
        )}
        <Star className="z-10" />
        <span className="z-10">
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
        </span>
      </AnimatedNav>
    </GridSection>
  );
}
