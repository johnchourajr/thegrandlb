import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/core/Layout'
import InteractiveMapWrap from '../components/InteractiveMapWrap'
import Map from '../components/svg/Map';


function outputRoomClass(slug) {
  let className
  let roomNumber
  switch(slug) {
    case "/tour/grand-ballroom/":
      className = "room-g"
      roomNumber = ""
      break;
    case "/tour/catalina-room/":
      className = "room-f"
      roomNumber = ""
      break;
    case "/tour/monarch-room/":
      className = "room-a"
      roomNumber = ""
      break;
    case "/tour/garden-room/":
      className = "room-e"
      roomNumber = ""
      break;
    case "/tour/pacific-room/":
      className = "room-c"
      roomNumber = ""
      break;
    case "/tour/board-room/":
      className = "room-board"
      roomNumber = ""
      break;
    case "/tour/palm-terrace/":
      className = "room-d"
      roomNumber = ""
      break;
    default:
      className = ""
      roomNumber = ""
  }
  return {
    className,
    roomNumber
  }
}

function toggleElement(el, string) {
  el.classList.toggle(string)
}

function mouseEvent(slug) {
  let output = outputRoomClass(slug)
  let element = document.querySelectorAll(`.${output.className}`)
  for (var i = 0; i < element.length; i++) {
    toggleElement(element[i], `hover`)
  }
}

const MapPage = ({ data, status, history }) => {
  const { edges: posts } = data.postData

  return (
    <Layout status={status}>
      <InteractiveMapWrap history={history}>
        <div className="interactive-map--nav">
          <h6>Rooms</h6>
          <div className="interactive-map--nav--inner">
          {posts.map(({ node: post }, i) => {

            return(
              <div
                key={i}
                onMouseOver={(e) => mouseEvent(post.fields.slug)}
                onMouseOut={(e) => mouseEvent(post.fields.slug)}
                onTouchStart={(e) => mouseEvent(post.fields.slug)}
                onTouchEnd={(e) => mouseEvent(post.fields.slug)}
                className="interactive-map--nav--item"
              >
                <Link
                  key={i}
                  to={post.fields.slug}
                >
                  {post.frontmatter.heading}
                </Link>
                <div className="interactive-map--nav--lower">
                  {post.frontmatter.numbers.array.map((item, i) => {
                    if (i < 2) {
                      return (
                        <div className="interactive-map--nav--lower-inner" key={i}>
                          <h3>{item.number}</h3>
                          <h6>{item.caption}</h6>
                        </div>
                      )
                    } else return null
                  })}
                  <Link to={post.fields.slug} className="interactive-map--nav--lower-inner" key={i}>
                    <h3>➝</h3>
                    <h6>View Room</h6>
                  </Link>
                </div>
              </div>
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
            numbers {
              array {
                number
                caption
              }
            }
          }
        }
      }
    }
  }
`
