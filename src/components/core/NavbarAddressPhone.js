import React, { Fragment } from "react"
import Link from 'gatsby-link'

//Data
import { siteDetails } from '../../data/siteDetails'

// Util Functions
import * as util from '../functions/util'

const NavbarAddressPhone = props => {
  return (
    <div className={props.className}>
      <div className="address">
        <a target="_blank" href={util.addressLink(siteDetails.address1, siteDetails.address2)}>
          {siteDetails.address1}
          <br />
          {siteDetails.address2}
        </a>
      </div>
      <div className="phone">
        <a target="_blank" href={`tel:${siteDetails.phone}`}>
          {util.formatPhoneNumber(siteDetails.phone)}
        </a>
      </div>
    </div>
  )
}

export default NavbarAddressPhone
