import React from 'react'
import Helmet from 'react-helmet'

import { slugify } from '../functions/util'

const Head = ({ location }) => {

  const pathname = location.pathname === "/" ? "home" : slugify(location.pathname)

  return (
    <Helmet
      title="The Grand LB"
      link={[
        {rel: "icon", type: "image/png", href: "/img/favicon.ico", sizes: "16x16"}
      ]}
      meta={[
        {name: "viewport", content: "width=device-width, initial-scale=1, shrink-to-fit=yes"},
        { name: "robots", content: "noindex" },
        { name: "googlebot", content: "noindex" },
        { name: "googlebot-news", content: "noindex" },
      ]}
      htmlAttributes={{ class: pathname }}
      bodyAttributes={{ class: pathname }}
    />
  )
}

export default Head
