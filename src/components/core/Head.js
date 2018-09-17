import React from 'react'

import Helmet from 'react-helmet'

const Head = () => (
  <Helmet
    title="The Grand LB"
  >
    <meta name="robots" content="noindex" />
    <meta name="googlebot" content="noindex" />
    <meta name="googlebot-news" content="noindex" />
  </Helmet>
)

export default Head
