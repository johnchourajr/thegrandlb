import React, { Fragment } from "react"
import Link from 'gatsby-link'

//Data
import { siteDetails } from '../../data/siteDetails'

// Util Functions
import * as util from '../functions/util'

const NavbarAddressPhone = props => {
  // console.log(siteDetails);
  return (
    <div className={props.className}>
      <div className="address">
        <a href={util.addressLink(siteDetails.address1, siteDetails.address2)}>
          {siteDetails.address1}
          <br />
          {siteDetails.address2}
        </a>
      </div>
      <div className="phone">
        <a href={`tel:${siteDetails.phone}`}>
          {util.formatPhoneNumber(siteDetails.phone)}
        </a>
      </div>
    </div>
  )
}

export default NavbarAddressPhone
