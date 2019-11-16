import React from 'react'

// Components
import Layout from '../components/core/Layout'
import PageHeader from '../components/PageHeader'

// Page
const NotFoundPage = ({ status }) => {

  let path = "/"

  if (typeof window != "undefined") {
    path = window.location.pathname
  }

  return (
    <Layout status={status} >
      <PageHeader
        title={"404"}
        heading={"Page Not\nFound"}
        caption={`"${path}" not found`}
      >
      </PageHeader>
    </Layout>
  )
}

export default NotFoundPage
