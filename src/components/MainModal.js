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

export default MainModal
