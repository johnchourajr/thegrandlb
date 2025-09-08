"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TagManager from "react-gtm-module";

const GTM_ID = "GTM-5K7K8QZ";

export type ModalRoute = "/inquire" | "/map" | "/thanks";

export const useModalOverlay = () => {
  /**
   * State
   */
  const [modalOverlay, setModalOverlay] = useState(false);
  const [didMount, setDidMount] = useState(false);

  /**
   * Router
   */
  const router = useRouter();
  const pathname = usePathname();

  /**
   * Functions
   */
  const openOverlay = (route: ModalRoute) => {
    if (pathname === route) return;
    router.push(route);
    setModalOverlay(true);
  };

  const closeOverlay = () => {
    router.back();
    setModalOverlay(false);
  };

  const toggleModalOverlay = (route: ModalRoute) => {
    if (modalOverlay) {
      closeOverlay();
    } else {
      openOverlay(route);
    }
  };

  /**
   * Effects
   */
  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (!didMount) return;
    TagManager.initialize({ gtmId: GTM_ID });

    const handleRouteChange = (url: string) => {
      TagManager.dataLayer({ dataLayer: { page: url } });
    };

    // In app directory, we handle route changes via pathname changes
    handleRouteChange(pathname);
  }, [didMount, pathname]);

  useEffect(() => {
    if (
      pathname === "/inquire" ||
      pathname === "/thanks" ||
      pathname === "/map"
    ) {
      setModalOverlay(true);
    } else {
      setModalOverlay(false);
    }
  }, [pathname]);

  return {
    modalOverlay,
    openOverlay,
    closeOverlay,
    toggleModalOverlay,
  };
};
