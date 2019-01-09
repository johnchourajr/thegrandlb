import React from 'react'
import PropTypes from 'prop-types'
import Link, { navigateTo } from 'gatsby-link'

class InquiryDone extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "...",
      eventName: "...",
      email: "...",
      urlQuery: "",
    }
  }

  componentDidMount() {
    if (window) {
      const name = this.getParameterByName("glb-contact-name")
      const eventName = this.getParameterByName("glb-event-name")
      const email = this.getParameterByName("glb-contact-email")
      let urlQuery = ""

      if (window.location.search) {
        urlQuery = window.location.search
      }

      this.setState({
        name: name,
        eventName: eventName,
        email: email,
        urlQuery: urlQuery,
      })
    }
  }

  getParameterByName(name, url) {
    if (window) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
  }

  render () {
    const { name, eventName, email, urlQuery } = this.state
    return(
      <section className="section">
        <div className="wrapper">
          <div className="inquire-page--header">
            <h6 className="xs-mb3">Done</h6>
            <h3 className="display xs-text-center">We'll Be In Touch</h3>
          </div>
          <div className="clearfix xs-col-12 md-col-6 md-offset-3 lg-col-4 lg-offset-4">
            <p className="xs-text-center large">Hey <u>{name}</u>, we’re honored to help with your <u>{eventName}</u> event. An email has been sent to <u>{email}</u> with the details you provided.</p>
            <p className="xs-text-center large">Our Event Professionals will touch base in 1-2 Business Days.</p>
          </div>
          <div className="inquire-page--footer xs-flex xs-flex-align-center xs-flex-justify-center">
            <Link
              className={`button button--secondary`}
              to={`/inquire${urlQuery}`}
            >
              Change Answers
            </Link>
            <Link
              className={`button`}
              to={`/`}
            >
              Return to Website
            </Link>
          </div>
        </div>
      </section>
    )
  }
}

export default InquiryDone;
