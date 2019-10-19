import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'gatsby'
import ReactModal from 'react-modal';
import moment from 'moment'

// Components
import X from '../svg/X'
import Buttons from '../Buttons'

const NabBannerLink = props => {
  if (props.button) {
    return (
      <button onClick={props.onClick}>
        {props.button}
      </button>
    )
  } else return null
}

const MainModal = props => {
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      position: 'absolute',
      top: '0px',
      left: 'unset',
      right: 'unset',
      bottom: 'unset',
      border: 'none',
      width: '90vw',
      maxWidth: '620px',
      minHeight: '200px',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '0px',
      outline: 'none',
      padding: '20px',
    }
  }

  return (
    <ReactModal
      isOpen={props.modalVisible}
      contentLabel="Minimal Modal Example"
      onRequestClose={e => props.handleModal(false)}
      shouldCloseOnOverlayClick={true}
      closeTimeoutMS={500}
      style={styles}
    >
      <button onClick={e => props.handleModal(false)} className="nav--banner--close"><X/></button>
      <div className="modal--inner">
        {props.children}
      </div>
    </ReactModal>
  )
}

// Component
const NavBanner = props => {
  const [dismissed, handleDismiss] = useState(props.dismissed)
  const [modalVisible, handleModal] = useState(false)

  if (props.show) {

    const dateRange = moment().isBetween(props.startDate, props.endDate)

    if (dateRange) {
      return (
        <div className={`nav--banner ${dismissed ? "nav--banner--dismissed" : null}`}>
          <div className="wrapper">
            <p>{props.text} <NabBannerLink onClick={e => handleModal(true)} button={props.button}/></p>
            <button onClick={e => handleDismiss(true)} className="nav--banner--close"><X/></button>
          </div>
          <MainModal modalVisible={modalVisible} handleModal={handleModal}>
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
                    modal: handleModal,
                  }
                ]}
              />
          </MainModal>
        </div>
      )
    } else return null
  } return null
}

export default NavBanner
