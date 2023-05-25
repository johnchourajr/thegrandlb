import useMediaQuery from "@/hooks/useMediaQuery";
import { PrismicLink } from "@prismicio/react";
import clsx from "clsx";
import { m, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { linkResolver } from "../../prismicio";
import { NavItem } from "./NavItem";
import StringText from "./StringText";

export const NavParentItem = ({
  href,
  link_source,
  link_title,
  items,
  show = true,
  isNavOpen,
  setIsNavOpen,
  className,
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
  }, [router.events]); // eslint-disable-line react-hooks/exhaustive-deps

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
          "via-100% after:xl:pointer-events-none after:xl:fixed after:xl:inset-0 after:xl:top-0 after:xl:z-[1] after:xl:h-[110vh] after:xl:bg-gradient-to-b after:xl:from-bg after:xl:to-bg after:xl:opacity-0 after:xl:transition-opacity after:xl:duration-700 after:xl:ease-out-expo after:xl:content-[''] hover:after:xl:opacity-90",
        className
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
          aria-label={`Navigate to ${link_title}`}
          {...categoryActionProps()}
          {...(isMobile && hasChildren && { "aria-expanded": isHovering })}
          {...(isMobile &&
            hasChildren && { "aria-label": "Open or close sub-menu" })}
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
              aria-hidden={isMobile}
              aria-label="Open or close sub-menu"
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
                  aria-label={`Navigate to ${child_link_title}`}
                />
              );
            }
          )}
        </m.ul>
      )}
    </m.li>
  );
};
