import useMediaQuery from "@/hooks/useMediaQuery";
import { handleEvent } from "@/utils/events";
import { PrismicLink } from "@prismicio/react";
import clsx from "clsx";
import { m, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const controls = useAnimation();
  const [isHovering, setIsHovering] = useState(false);
  const isMobile = useMediaQuery(1024);

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
        onClick: () =>
          handleEvent({
            category: `nav_category_item`,
            label: link_title,
          }),
      };
    }
  };

  const onRouteChangeCloseMenu = useCallback(() => {
    controls.start(dropdownVariants.closed);
    setIsHovering(false);
    setIsNavOpen(false);
  }, [controls, dropdownVariants.closed, setIsNavOpen]);

  useEffect(() => {
    const handleClickOutside = (event: KeyboardEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onRouteChangeCloseMenu();
      }
    };

    document.addEventListener("keydown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleClickOutside);
    };
  }, [isNavOpen, setIsNavOpen, onRouteChangeCloseMenu]);

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
    <m.div
      ref={ref}
      className={clsx(
        "w-full list-none transition-opacity duration-300 ease-out-expo lg:w-fit",
        hasChildren &&
          "via-100% after:lg:pointer-events-none after:lg:fixed after:lg:inset-0 after:lg:top-0 after:lg:z-[1] after:lg:h-[110vh] after:lg:bg-gradient-to-b after:lg:from-bg after:lg:to-bg after:lg:opacity-0 after:lg:transition-opacity after:lg:duration-700 after:lg:ease-out-expo after:lg:content-[''] hover:after:lg:opacity-90",
        isHovering && "after:lg:opacity-90",
        className
      )}
      initial={!isMobile && ({ "--height": "50vh" } as any)}
      whileHover={!isMobile && ({ "--height": "100vh" } as any)}
      transition={{ duration: 0.3 }}
      data-label={"nav-item"}
      {...desktopParentProps}
    >
      <span
        className={clsx(
          "relative flex justify-between lg:justify-start",
          "--bg-yellow-100 border-b-[1.5px] border-black py-3",
          "lg:border-none lg:py-0"
        )}
      >
        <CategoryAction
          tabIndex={0}
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
              "after:absolute after:bottom-0 after:left-0 after:z-10 after:h-[1.5px] after:w-[100%] after:origin-top-right after:scale-x-0 after:bg-black after:opacity-0 after:transition-transform after:duration-300 after:ease-out-expo after:content-[''] after:lg:opacity-100",
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
                "select-none after:absolute after:left-[105%] after:top-0 after:rounded-sm after:p-3 after:py-2 focus-visible:after:bg-black focus-visible:after:text-white focus-visible:after:content-[attr(data-content)]"
              )}
              onClick={handleToggleControls}
              tabIndex={isMobile ? -1 : 0}
              data-content={isHovering ? "Close" : "Open"}
              data-label={"aria-nav-button"}
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
            "bg-green-400 flex flex-col overflow-hidden lg:absolute lg:overflow-visible lg:pb-4 lg:pt-2",
            "z-10 border-b-[1.5px] border-black",
            "lg:border-none",
            !isHovering && "pointer-events-none"
          )}
          initial={"closed"}
          animate={controls}
          variants={dropdownVariants}
        >
          <NavItem
            field={link_source}
            text={`${link_title} Overview`}
            linkClassName={"group relative"}
            className={"pt-2"}
            tabIndex={isHovering ? 0 : -1}
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
                  tabIndex={isHovering ? 0 : -1}
                  linkClassName={"group relative"}
                  className={"last-of-type:pb-2 last-of-type:lg:pb-0 "}
                  aria-label={`Navigate to ${child_link_title}`}
                />
              );
            }
          )}
        </m.ul>
      )}
    </m.div>
  );
};
