import React from 'react'
import PropTypes from 'prop-types'
import Link, { withPrefix } from 'gatsby-link'

// **
// ** Using React GA for event tracking
// https://github.com/pushtell/react-ga
import ReactGA from 'react-ga'

// **
// ** Using React AB Test to conduct the AB Testing
// https://github.com/pushtell/react-ab-test
import Experiment from "react-ab-test/lib/Experiment"
import Variant from "react-ab-test/lib/Variant"
import emitter from "react-ab-test/lib/emitter"

import PageSection from '../components/PageSection'
import PageCta from '../components/PageCta'

class HomeABTest extends React.Component {
  render () {
    const { frontmatter } = this.props
    return (
      <Experiment ref="experiment" name="HomeIntroModule">
        <Variant name="A">
          <PageSection
            heading={frontmatter.subhead}
          />
          <PageSection
            wrapperClassName="page-feature--wrapper"
          >
            {frontmatter.topFeatures.map((item, i) => {
              return (
                <div key={i} className="page-feature page-feature--lower-bar col xs-col-12 md-col-4">
                  <Link to={item.url}>
                    <h1 className="xs-text-center">{item.text}</h1>
                  </Link>
                </div>
              )
            })}
          </PageSection>
          <PageCta
            accent={'grandPink'}
            heading={frontmatter.ctaUpper.heading}
            buttons={[
              {
                text: "Plan Your Private Event",
                url: "/inquire/",
                event: {
                  category: 'InquireAction',
                  action: 'homeCtaUpperInquireAction',
                  label: 'Home Page Experiment A',
                },
              }
            ]}
            img={frontmatter.ctaUpper.img}
          />
        </Variant>
        <Variant name="B">
          <PageSection
            heading={frontmatter.subhead}
          />
          <PageCta
            accent={'grandPink'}
            heading={"Chat with our\nEvent Pro's today"}
            buttons={[
              {
                text: "Let's Talk",
                url: "/contact/",
                event: {
                  category: 'ContactAction',
                  action: 'homeContactAction',
                  label: 'Home Page Experiment B',
                },
              }
            ]}
            img={"/img/about/team-sales.jpg"}
          />
        </Variant>
        <Variant name="C">
          <PageSection
            heading={frontmatter.subhead}
          />
          <PageCta
            accent={'grandPink'}
            heading={"Chat with Elizabeth\nor Marissa today."}
            buttons={[
              {
                text: "Let's Talk",
                url: "/contact/",
                event: {
                  category: 'ContactAction',
                  action: 'homeContactAction',
                  label: 'Home Page Experiment C',
                },
              }
            ]}
            img={"/img/about/team-elizabeth-melissa-2.jpg"}
          />
        </Variant>
      </Experiment>
    )
  }
}

// Called when the experiment is displayed to the user.
emitter.addPlayListener(function(experimentName, variantName){
  const str = `Displaying experiment '${experimentName}' variant '${variantName}'`

  console.log(str)
  ReactGA.event({
    category: 'HomeABTest',
    action: str,
  });
});

// Called when a 'win' is emitted, in this case by this.refs.experiment.win()
emitter.addWinListener(function(experimentName, variantName){
  const str = `Variant '${variantName}' of experiment '${experimentName}' was clicked`

  console.log(str)
  ReactGA.event({
    category: 'HomeABTest',
    action: str,
  });
});

export default HomeABTest
