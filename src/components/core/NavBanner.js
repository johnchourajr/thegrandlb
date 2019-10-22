import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'gatsby'
import ReactModal from 'react-modal';
import moment from 'moment'

// Components
import X from '../svg/X'
import Buttons from '../Buttons'
import BannerWrap from '../BannerWrap'
import NavBannerLink from './NavBannerLink'
import MainModal from "../MainModal"

// Component
const NavBanner = props => {

  const {
    button,
    dismissed,
    endDate,
    modalDetail,
    show,
    startDate,
    text
  } = props.siteBanner

  const [modalVisible, handleModal] = useState(false)

  return (
    <BannerWrap siteBanner={props.siteBanner}>
      <div className={`nav--banner ${props.bannerDismissState ? "nav--banner--dismissed" : null}`}>
        <div className="wrapper">
          <p>{text} <NavBannerLink onClick={e => handleModal(true)} button={button}/></p>
          <button onClick={e => props.handleBannerDismiss(true)} className="nav--banner--close"><X/></button>
        </div>
        <MainModal modalVisible={modalVisible} handleModal={handleModal}>
            <h6>{modalDetail.title}</h6>
            <p>{modalDetail.description}</p>
            <Buttons
              buttons={[
                {
                  text: modalDetail.buttonText,
                  url: modalDetail.buttonUrl,
                  event: {
                    category: 'BannerInquiryAction',
                    action: modalDetail.buttonText,
                    label: modalDetail.buttonText,
                  },
                  isSecondary: true,
                  modal: handleModal,
                }
              ]}
            />
        </MainModal>
      </div>
    </BannerWrap>
  )
}

export default NavBanner
