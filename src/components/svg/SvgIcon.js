import React from "react"

import Facebook from '../svg/Facebook'
import Instagram from '../svg/Instagram'
import Twitter from '../svg/Twitter'

const SvgIcon = props => {
  const components = {
    twitter: Twitter,
    facebook: Facebook,
    instagram: Instagram,
  }

  const IconComponent = components[props.component];
  return <IconComponent />
}

export default SvgIcon
