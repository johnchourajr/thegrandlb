import React from 'react'
import PropTypes from 'prop-types'

const BasicPagePreview = ({ entry, widgetFor }) => (
  <div style={{padding: '2rem'}}>
    <h6>{entry.getIn(['data', 'title'])}</h6>
    <p>{entry.getIn(['data', 'description'])}</p>
    <br/>
    <p>Company Name: {entry.getIn(['data', 'companyName'])}</p>
    <p>Phone: {entry.getIn(['data', 'phone'])}</p>
    <p>Address Line 1: {entry.getIn(['data', 'address1'])}</p>
    <p>Address Line 2: {entry.getIn(['data', 'address2'])}</p>
    <p>URL: {entry.getIn(['data', 'url'])}</p>
    <p>Email: {entry.getIn(['data', 'email'])}</p>
    <br/>
    <p>Google Analytics: {entry.getIn(['data', 'ga'])}</p>
    <p>Site Public: {entry.getIn(['data', 'sitePublic'])}</p>
  </div>
)

BasicPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BasicPagePreview
