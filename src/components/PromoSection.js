import React from 'react'

// Components
import PageSection from '../components/PageSection'
import Buttons from '../components/Buttons'


const PromoSection = props => {
  return (
    <PageSection sectionClassName="xs-pt5">
      <div className="page-promo--wrapper">
        <div className="page-promo--left">
          <img src="/img/promo/01-friday-sunday-graphic.jpg"/>
        </div>
        <div className="page-promo--right">
          <div className="page-promo--right__text">
            <h6>Friday Events</h6>
            <h1>Free Chivari Chair Fridays</h1>
          </div>
          <Buttons
            buttons={[
              {
                text: props.siteBanner.modalDetail.buttonText,
                url: props.siteBanner.modalDetail.buttonUrl,
                isSecondary: true,
                event: {
                  category: 'ContactAction',
                  action: 'Test092919__Home__Action_C',
                  label: 'Test092919__Home__Action_C',
                },
              }
            ]}
          />
          <div className="page-promo--right__text">
            <h6>Sunday Events</h6>
            <h1>5% off all Appetizers</h1>
          </div>
        </div>
      </div>
    </PageSection>
  )
}

export default PromoSection
