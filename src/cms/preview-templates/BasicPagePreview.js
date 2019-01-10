import React from 'react'
import PropTypes from 'prop-types'

const BasicPagePreview = ({ entry, widgetFor }) => (
  <React.Fragment>
    <h6>{entry.getIn(['data', 'title'])}</h6>
    <h2>{entry.getIn(['data', 'heading'])}</h2>
    <p>{widgetFor('body')}</p>
  </React.Fragment>
)

BasicPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BasicPagePreview
