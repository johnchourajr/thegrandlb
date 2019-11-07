import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'gatsby'
import ReactModal from 'react-modal';
import moment from 'moment'

// Components
import X from '../svg/X'
import Buttons from '../Buttons'
import BannerWrap from '../BannerWrap'
import NavBannerLink from './NavBannerLink'
import BannerModal from "../BannerModal"

// Component
const NavBanner = props => {

  const [modalVisible, handleModal] = useState(false)

  const {
    button,
    dismissed,
    endDate,
    modalDetail,
    show,
    startDate,
    text
  } = props.siteBanner

  const dismissedClass = props.bannerDismissState ? "nav--banner--dismissed" : sessionStorage.getItem('bannerDismissState') === 'dismissed' ? "nav--banner--dismissed" : null

  return (
    <BannerWrap siteBanner={props.siteBanner}>
      <div className={`nav--banner ${dismissedClass}`}>
        <div className="wrapper">
          <p>{text} <NavBannerLink onClick={e => handleModal(true)} button={button}/></p>
          <button onClick={e => props.handleBannerDismiss(true)} className="nav--banner--button nav--banner--close"><X/></button>
        </div>
        <BannerModal
          modalVisible={modalVisible}
          handleModal={handleModal}
          modalDetail={modalDetail}
        />
      </div>
    </BannerWrap>
  )
}

export default NavBanner
