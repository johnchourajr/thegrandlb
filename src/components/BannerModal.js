import React from 'react'

// Components
import Buttons from './Buttons'
import MainModal from "./MainModal"

const BannerModal = props => {

  if (props.modalDetail) {
    return (
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
  } else return null
}

export default BannerModal;
