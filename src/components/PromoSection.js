import React, { useState } from "react";

// Components
import PageSection from "../components/PageSection";
import Buttons from "../components/Buttons";
import BannerModal from "./BannerModal";

const PromoSection = props => {
  const [modalVisible, handleModal] = useState(false);

  return (
    <PageSection sectionClassName="xs-pt5">
      <div className="page-promo--wrapper">
        <div className="page-promo--left">
          <img
            src="/img/promo/01-friday-sunday-graphic.jpg"
            alt="Friday & Sunday Promo"
          />
        </div>
        <div className="page-promo--right">
          <div className="page-promo--right__text">
            <h6>Our Specials</h6>
            <h1>Thursday is the New Friday</h1>
            <h1>Free Chivari Chair Fridays</h1>
            <h1>Sunday Funday</h1>
          </div>
          <Buttons
            buttons={[
              {
                text: props.siteBanner.modalDetail.buttonText,
                url: props.siteBanner.modalDetail.buttonUrl,
                isSecondary: false,
                event: {
                  category: "ContactAction",
                  action: "Test092919__Home__Action_C",
                  label: "Test092919__Home__Action_C"
                }
              }
            ]}
          />
          <div
            className="page-promo--right__button"
            onClick={e => handleModal(true)}
          >
            Learn More
          </div>
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

export default PromoSection;
