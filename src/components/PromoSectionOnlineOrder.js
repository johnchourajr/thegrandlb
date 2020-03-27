import React, { useState } from "react";

// Components
import PageSection from "../components/PageSection";
import Buttons from "../components/Buttons";
import BannerModal from "./BannerModal";

const PromoSectionOnlineOrder = props => {
  const [modalVisible, handleModal] = useState(false);

  return (
    <PageSection sectionClassName="xs-pt5">
      <div className="page-promo--wrapper">
        <div className="page-promo--left">
          <img
            src="/img/promo/02-feed-your-people.jpg"
            alt="Friday & Sunday Promo"
          />
        </div>
        <div className="page-promo--right">
          <div className="page-promo--right__text">
            <h6>Stay Safe</h6>
            <h1>Great Meals and Grocery Goods</h1>
            <h6 className="xs-mb2">1. Order Online</h6>
            <h6>2. Pick-up Curbsite</h6>
          </div>
          <a
            href={props.siteBanner.buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="button button--secondary"
          >
            {props.siteBanner.button}
          </a>
        </div>
      </div>
      <BannerModal
        modalVisible={modalVisible}
        handleModal={handleModal}
        modalDetail={props.siteBanner.modalDetail}
      />
    </PageSection>
  );
};

export default PromoSectionOnlineOrder;
