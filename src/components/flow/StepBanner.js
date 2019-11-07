import React, { useRef, useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import moment from 'moment'

// Components
import X from '../svg/X'
import Check from '../svg/Check'
import Buttons from '../Buttons'
import BannerWrap from '../BannerWrap'
import NavBannerLink from '../core/NavBannerLink'
import BannerModal from "../BannerModal"

const StepBanner = props => {

  const [modalVisible, handleModal] = useState(false)

  const {
    button,
    dismissed,
    endDate,
    modalDetail,
    show,
    startDate,
    text,
    matchText,
    toMatch,
  } = props.siteBanner

  const dateSelected = props.flowPages[1].forms[0].value
  const selectedDayOfWeek = moment(dateSelected).format("dddd")
  const isMatch = toMatch.includes(selectedDayOfWeek)
  const dismissedCondition = props.bannerDismissState ? "nav--banner--dismissed" : sessionStorage.getItem('bannerDismissState') === 'dismissed' ? "nav--banner--dismissed" : null
  const dismissedClass = isMatch ? null : dismissedCondition

  return (
    <BannerWrap siteBanner={props.siteBanner}>
      <div className={`nav--banner ${dismissedClass} ${isMatch && "nav--banner--confirm"} nav--banner--inline`}>
        <div className="wrapper">
          <p>{!isMatch ? text : matchText} <NavBannerLink onClick={e => handleModal(true)} button={button}/></p>
          {!isMatch && <div onClick={e => props.handleBannerDismiss(true)} className="nav--banner--button nav--banner--close"><X/></div>}
          {isMatch && <div className="nav--banner--button"><Check/></div>}
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

export default StepBanner
