import React, { useState } from "react";
import moment from "moment";

// Components
import X from "../svg/X";
import Check from "../svg/Check";
import BannerWrap from "../BannerWrap";
import NavBannerLink from "../core/NavBannerLink";
import BannerModal from "../BannerModal";

const StepBanner = props => {
  const [modalVisible, handleModal] = useState(false);

  const {
    button,
    buttonLink,
    hasModal,
    modalDetail,
    text,
    matchText,
    toMatch
  } = props.siteBanner;

  const dateSelected = props.flowPages[1].forms[0].value;
  const selectedDayOfWeek = moment(dateSelected).format("dddd");
  const isMatch = toMatch.includes(selectedDayOfWeek);

  let dismissedCondition = null;

  if (typeof window != "undefined") {
    dismissedCondition = props.bannerDismissState
      ? "nav--banner--dismissed"
      : sessionStorage.getItem("bannerDismissState") === "dismissed"
      ? "nav--banner--dismissed"
      : null;
  }

  const dismissedClass = isMatch ? null : dismissedCondition;

  return (
    <BannerWrap siteBanner={props.siteBanner}>
      <div
        className={`nav--banner ${dismissedClass} ${isMatch &&
          "nav--banner--confirm"} nav--banner--inline`}
      >
        <div className="nav--banner--inner">
          <p>
            {!isMatch ? text : matchText}{" "}
            {hasModal ? (
              <NavBannerLink onClick={e => handleModal(true)} button={button} />
            ) : (
              <a href={buttonLink} target="_blank" rel="noopener noreferrer">
                {button}
              </a>
            )}
          </p>
          {!isMatch && (
            <button
              onClick={e => props.handleBannerDismiss(true)}
              className="nav--banner--button nav--banner--close"
            >
              <X />
            </button>
          )}
          {isMatch && (
            <div className="nav--banner--button">
              <Check />
            </div>
          )}
        </div>
        <BannerModal
          modalVisible={modalVisible}
          handleModal={handleModal}
          modalDetail={modalDetail}
        />
      </div>
    </BannerWrap>
  );
};

export default StepBanner;
