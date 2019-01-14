import React from 'react'

import Caret from '../svg/Caret'

const NavbarCaret = (props) => {
  if (props.subpages && !props.noHoverMenu) {
    return <Caret/>
  } else return null
}

export default NavbarCaret
