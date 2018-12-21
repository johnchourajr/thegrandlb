import React from 'react'
import PropTypes from 'prop-types'

import Link, { withPrefix } from 'gatsby-link'
import Layout from '../components/core/Layout'
import InteractiveMapWrap from '../components/InteractiveMapWrap'
import PageHeader from '../components/PageHeader'
import Map from '../components/svg/Map';


// .room-a
// .room-b
// .room-c
// .room-d
// .room-e
// .room-f
// .room-g
// .room-board

function outputRoomClass(slug) {
  let className = ""
  switch(slug) {
    case "/tour/grand-ballroom/":
      className = "room-g"
      break;
    case "/tour/catalina-room/":
      className = "room-f"
      break;
    case "/tour/monarch-room/":
      className = "room-a"
      break;
    case "/tour/garden-room/":
      className = "room-e"
      break;
    case "/tour/pacific-room/":
      className = "room-c"
      break;
    case "/tour/board-room/":
      className = "room-board"
      break;
    case "/tour/palm-courtyard/":
      className = "room-d"
      break;
    default:
      className = ""
  }
  return className
}

function toggleElement(el, string) {
  el.classList.toggle(string)
}

function mouseEvent(slug) {
  let element = document.querySelectorAll(`.${outputRoomClass(slug)}`)
  for (var i = 0; i < element.length; i++) {
    toggleElement(element[i], `hover`)
  }
}

const MapPage = ({ data, status, history }) => {
  const { frontmatter, html } = data.pageData
  const { edges: posts } = data.postData

  return (
    <Layout status={status}>
      <InteractiveMapWrap history={history}>
        <div className="interactive-map--nav">
          <h6>Rooms</h6>
          <div className="interactive-map--nav--inner">
          {posts.map(({ node: post }, i) => {

            return(
              <Link
                key={i}
                to={post.fields.slug}
                className="interactive-map--nav--item"
                onMouseOver={(e) => mouseEvent(post.fields.slug)}
                onMouseOut={(e) => mouseEvent(post.fields.slug)}
                onTouchStart={(e) => mouseEvent(post.fields.slug)}
                onTouchEnd={(e) => mouseEvent(post.fields.slug)}
              >
                {post.frontmatter.heading}
              </Link>
            )
          })}
          </div>
        </div>
        <div className="interactive-map--svg">
          <Map baseColor="#FFFCED"/>
        </div>
      </InteractiveMapWrap>
    </Layout>
  )
}

export default MapPage

export const MapPageQuery = graphql`
  query MapPage($id: String!) {
    pageData: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        heading
      }
    }
    postData: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___heading] }
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
            path
            roomMeta {
              eventType
              eventTypeInfo {
                type
                description
              }
              roomFeatures
              guestCount
            }
          }
        }
      }
    }
  }
`
