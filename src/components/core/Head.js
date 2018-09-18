import React from 'react'
import Helmet from 'react-helmet'

import { slugify } from '../functions/util'

const Head = ({ location }) => {

  const pathname = location.pathname === "/" ? "home" : slugify(location.pathname)

  return (
    <Helmet
      title="The Grand LB"
      bodyAttributes={{ class: pathname }}
      meta={[
        { name: "robots", content: "noindex" },
        { name: "googlebot", content: "noindex" },
        { name: "googlebot-news", content: "noindex" },
      ]}
    />
  )
}

export default Head
