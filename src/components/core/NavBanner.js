import React, { useState } from "react";

// Components
import X from "../svg/X";
import BannerWrap from "../BannerWrap";
import NavBannerLink from "./NavBannerLink";
import BannerModal from "../BannerModal";

// Component
const NavBanner = props => {
  const [modalVisible, handleModal] = useState(false);

  const { button, buttonLink, hasModal, modalDetail, text } = props.siteBanner;

  let dismissedClass = null;

  if (typeof window != "undefined") {
    dismissedClass = props.bannerDismissState
      ? "nav--banner--dismissed"
      : sessionStorage.getItem("bannerDismissState") === "dismissed"
      ? "nav--banner--dismissed"
      : null;
  }

  if (props.siteBanner) {
    return (
      <>
        <BannerWrap siteBanner={props.siteBanner}>
          <div className={`nav--banner ${dismissedClass}`}>
            <div className="wrapper">
              <p>
                {text}{" "}
                {hasModal ? (
                  <NavBannerLink
                    onClick={e => handleModal(true)}
                    button={button}
                  />
                ) : (
                  <a
                    href={buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {button}
                  </a>
                )}
              </p>
              {props.siteBanner.mainDismissable && (
                <button
                  onClick={e => props.handleBannerDismiss(true)}
                  className="nav--banner--button nav--banner--close"
                >
                  <X />
                </button>
              )}
            </div>
            <BannerModal
              modalVisible={modalVisible}
              handleModal={handleModal}
              modalDetail={modalDetail}
            />
          </div>
        </BannerWrap>
      </>
    );
  } else return null;
};

export default NavBanner;
