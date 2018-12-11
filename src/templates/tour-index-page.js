import React from 'react'
import PropTypes from 'prop-types'
import Link, { withPrefix } from 'gatsby-link'
import _ from 'lodash'

import { slugify } from '../components/functions/util'
import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/core/Layout'
import PageHeader from '../components/PageHeader'
import PageSection from '../components/PageSection'
import PageCta from '../components/PageCta'
import Buttons from '../components/Buttons'
import PageCarousel from '../components/PageCarousel'
import PageSegue from '../components/PageSegue'
import NumberArray from '../components/NumberArray'
import FormSelect from '../components/FormSelect'
import Video from '../components/Video'

import Map from '../components/svg/Map';


function outputOptions(data, key) {

  const output = data.map(item => {
    const items = item.node.frontmatter.roomMeta[key]
    return items
  })

  return _.union(...output)
}

class FilterList extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      dataFilters: [],
      filterOptions: [],
    }

    this.handleFormChange = this.handleFormChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      data: this.props.data,
      dataFilters: this.createDataFilterSets(this.props.data),
    })
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  createDataFilterSets(data) {
    const dataFilterSets = this.props.dataFilters.map(item => {
      return outputOptions(data, item)
    })
    // console.log(dataFilterSets);
    return dataFilterSets
  }

  handleFormChange(event, page, field) {
    this.setState({ [event.target.name]: event.target.value });

  }

  render() {
    const {
      data,
      dataFilters
    } = this.state

    return(
      <div className="clearfix gutters card-wrap">

        {data.map(({ node: post }) => (
          <div key={post.id} className="col xs-col-6">
            <div className="card">
              <Link to={post.fields.slug}>
                {post.frontmatter.heading}
                <br/>
                {/*<u>Type:</u>
                {post.frontmatter.roomMeta.eventType.map((item) => (
                  <div key={item}>{item}</div>
                ))}
                <u>Features:</u>
                {post.frontmatter.roomMeta.roomFeatures.map((item) => (
                  <div key={item}>{item}</div>
                ))}
                <u>Guest Count:</u>
                {post.frontmatter.roomMeta.guestCount.map((item) => (
                  <div key={item}>{item}</div>
                ))}*/}
              </Link>
            </div>
        </div>
        ))}
      </div>
    )
  }
}

const TourIndex = ({ data, status, location }) => {
  const { frontmatter, html } = data.pageData
  const { edges: posts } = data.postData
  const { pathname } = location
  const currentPage = slugify(pathname)

  return (
    <Layout status={status}>
      <PageHeader title={frontmatter.title} heading={frontmatter.heading} />
      <div className="page-image-full page-image-full--clean">
        <Video
          source={["/video/tour.compressed.mp4"]}
          poster={"/video/tour-poster.jpg"}
        />
      </div>
      <PageSection
        heading={frontmatter.map.heading}
      />
      <div className="map-svg--wrapper">
        <Map/>
      </div>
      <PageSection
        buttons={frontmatter.map.buttons}
      />
      <PageSection heading={'Yours By Design'}>
        <FilterList
          data={posts}
          dataFilters={["eventType","roomFeatures","guestCount"]}
        />
      </PageSection>
      <NumberArray
        heading={frontmatter.numbers.heading}
        array={frontmatter.numbers.array}
      />
      <PageSection
        heading={frontmatter.carousel.heading}
      >
      <PageCarousel
        items={[...frontmatter.carousel.array]}
        settings={{
          showIndicators: true,
          infiniteLoop: true,
          emulateTouch: true,
        }}
      />
      </PageSection>
      <PageSection
        heading={frontmatter.cta.heading}
        headingClassName={"xs-mb3"}
        buttons={frontmatter.cta.buttons}
      />
      <PageSegue
        currentPage={currentPage}
      />
  </Layout>
  )
}


export default TourIndex

export const basicPageQuery = graphql`
  query TourIndex($id: String!) {
    pageData: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        heading
        hero
        map {
          heading
          buttons {
            text
            url
            isSecondary
          }
        }
        roomlist
        numbers {
          heading
          array {
            prefix
            number
            suffix
            caption
            description
          }
        }
        carousel {
          heading
          array {
            img
            caption
          }
        }
        cta {
          heading
          buttons {
            text
            url
          }
        }
      }
    }
    postData: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "tour-template-page" } }}
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            heading
            title
            hero
            roomMeta {
              eventType
              roomFeatures
              guestCount
            }
          }
        }
      }
    }
  }
`
