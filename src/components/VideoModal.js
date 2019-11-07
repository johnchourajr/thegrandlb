import React from 'react'
import ReactModal from 'react-modal';

// Components
import X from './svg/X'

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
      background: '-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0, .95)), to(rgba(0,0,0, .8)))',
      background: 'linear-gradient(to bottom, rgba(0,0,0, .95) 0%, rgba(0,0,0, .8) 100%)',
    },
    content: {
      position: 'absolute',
      top: 'unset',
      left: 'unset',
      right: 'unset',
      bottom: 'unset',
      border: 'none',
      width: '90vw',
      maxWidth: '90vw',
      height: '50.625vw',
      background: '#fff',
      overflow: 'hidden',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '0px',
      outline: 'none',
      padding: '0px',
      background: 'transparent',
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
      <button onClick={e => props.handleModal(false)} className="nav--banner--close nav--banner--close-float"><X fill="#ffffff"/></button>
      {props.children}
    </ReactModal>
  )
}

export default MainModal
