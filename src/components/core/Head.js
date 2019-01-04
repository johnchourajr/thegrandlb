import React from 'react'
import Helmet from 'react-helmet'

import { slugify } from '../functions/util'
import { siteDetails } from '../../data/siteDetails'

const Head = ({ location }) => {

  const pathname = location.pathname === "/" ? "home" : slugify(location.pathname)

  return (
    <Helmet
      title="The Grand LB"
      link={[
        { rel: "apple-touch-icon", sizes: "152x152", href: "/img/favicon/apple-touch-icon.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/favicon/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/img/favicon/favicon-16x16.png" },
        { rel: "manifest", href: "/img/favicon/site.webmanifest" },
        { rel: "mask-icon", href: "/img/favicon/safari-pinned-tab.svg", color: "#edfaff" },
      ]}
      meta={[
        { name: "viewport", content: "width=device-width, initial-scale=1, shrink-to-fit=yes"},
        { name: "msapplication-TileColor", content: "#edfaff" },
        { name: "theme-color", content: "#edfaff" },
      ]}
      htmlAttributes={{ class: pathname }}
      bodyAttributes={{ class: pathname }}
    />
  )
}

export default Head
