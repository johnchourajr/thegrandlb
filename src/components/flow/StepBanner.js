import React, { useRef, useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import moment from 'moment'

// Components
import X from '../svg/X'
import Buttons from '../Buttons'
import BannerWrap from '../BannerWrap'
import NavBannerLink from '../core/NavBannerLink'
import MainModal from "../MainModal"

const Modal = props => (
  <MainModal modalVisible={props.modalVisible} handleModal={props.handleModal}>
    <h6>{props.modalDetail.title}</h6>
    <p>{props.modalDetail.description}</p>
    <Buttons
      buttons={[
        {
          text: props.modalDetail.buttonText,
          url: props.modalDetail.buttonUrl,
          event: {
            category: 'BannerInquiryAction',
            action: props.modalDetail.buttonText,
            label: props.modalDetail.buttonText,
          },
          isSecondary: true,
          modal: props.handleModal,
        }
      ]}
    />
  </MainModal>
)

const StepBanner = props => {

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

  const [modalVisible, handleModal] = useState(false)

  if (isMatch) {
    return (
      <BannerWrap siteBanner={props.siteBanner}>
        <div className={`nav--banner`}>
          <div className="wrapper">
            <p>{matchText} <NavBannerLink onClick={e => handleModal(true)} button={button}/></p>
          </div>
          <Modal
            modalVisible={modalVisible}
            handleModal={handleModal}
            modalDetail={modalDetail}
          />
        </div>
      </BannerWrap>
    )
  } else {
    return (
      <BannerWrap siteBanner={props.siteBanner}>
        <div className={`nav--banner ${props.bannerDismissState ? "nav--banner--dismissed" : null}`}>
          <div className="wrapper">
            <p>{text} <NavBannerLink onClick={e => handleModal(true)} button={button}/></p>
            <button onClick={e => props.handleBannerDismiss(true)} className="nav--banner--close"><X/></button>
          </div>
          <Modal
            modalVisible={modalVisible}
            handleModal={handleModal}
            modalDetail={modalDetail}
          />
        </div>
      </BannerWrap>
    )
  }
}

export default StepBanner
