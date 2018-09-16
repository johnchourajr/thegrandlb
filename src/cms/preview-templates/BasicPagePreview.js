import React from 'react'
import PropTypes from 'prop-types'
import { BasicPageTemplate } from '../../templates/basic-page'

const BasicPagePreview = ({ entry, widgetFor }) => (
  <BasicPageTemplate
    title={entry.getIn(['data', 'title'])}
    heading={entry.getIn(['data', 'heading'])}
    content={widgetFor('body')}
  />
)

BasicPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BasicPagePreview
