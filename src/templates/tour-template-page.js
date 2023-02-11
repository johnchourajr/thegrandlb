import React from "react";
import { graphql } from "gatsby";

import { slugify } from "../components/functions/util";
import Layout from "../components/core/Layout";
import PageHeader from "../components/PageHeader";
import PageSection from "../components/PageSection";
import PageCarousel from "../components/PageCarousel";
import NumberArray from "../components/NumberArray";
import AmenitiesArray from "../components/AmenitiesArray";
import RoomSwitch from "../components/RoomSwitch";
import Video from "../components/Video";
import ScrollAnimate from "../components/ScrollAnimate";
import VideoPlayAction from "../components/VideoPlayAction";

// load assets based on page name using switch statement
const loadAssets = (pageName) => {
  switch (pageName) {
    case "board-room":
      return {
        source: [
          {
            src: `https://prismic-io.s3.amazonaws.com/the-grand/6653579c-c988-4498-bca4-47b8af10c19a_board-room.compressed.mp4`,
            type: "video/mp4",
          },
        ],
        poster: `https://images.prismic.io/the-grand/3c5306b5-33ff-45b5-9ea4-b443e3217a4e_board-room-poster.jpg?auto=compress,format`,
      };
    case "catalina-room":
      return {
        source: [
          {
            src: `https://prismic-io.s3.amazonaws.com/the-grand/236fb411-53ea-4886-a743-ae530c5c64b4_catalina-room.compressed.mp4`,
            type: "video/mp4",
          },
        ],
        poster: `https://images.prismic.io/the-grand/5c2f431d-93f0-4b6f-8418-e280c07082aa_catalina-room-poster.jpg?auto=compress,format`,
      };
    case "garden-room":
      return {
        source: [
          {
            src: `https://prismic-io.s3.amazonaws.com/the-grand/e62f9b5c-6bb7-47cb-b22c-58454710ad75_garden-room.compressed.mp4`,
            type: "video/mp4",
          },
        ],
        poster: `https://images.prismic.io/the-grand/efdeb2e6-4400-4459-b8f9-9d01087640cd_garden-room-poster.jpg?auto=compress,format`,
      };
    case "grand-ballroom":
      return {
        source: [
          {
            src: `https://prismic-io.s3.amazonaws.com/the-grand/f2fb9c33-e9fc-4fed-b857-01a566567966_grand-ballroom.compressed.mp4`,
            type: "video/mp4",
          },
        ],
        poster: `https://images.prismic.io/the-grand/29482176-4f87-417d-992b-429a80c72c88_grand-ballroom-poster.jpg?auto=compress,format`,
      };
    case "monarch-room":
      return {
        source: [
          {
            src: `https://prismic-io.s3.amazonaws.com/the-grand/1ee49cbb-b4bf-4c42-98c3-6a9b36e00b46_monarch-room.compressed.mp4`,
            type: "video/mp4",
          },
        ],
        poster: `https://images.prismic.io/the-grand/c2b93f53-0f29-46a9-ab4c-40daac2b092d_monarch-room-poster.jpg?auto=compress,format`,
      };
    case "pacific-room":
      return {
        source: [
          {
            src: `https://prismic-io.s3.amazonaws.com/the-grand/f8229457-5b23-44d5-87da-440c83622280_pacific-room.compressed.mp4`,
            type: "video/mp4",
          },
        ],
        poster: `https://images.prismic.io/the-grand/4e12b2bf-c930-4293-9228-59c9834deb5b_pacific-room-poster.jpg?auto=compress,format`,
      };
    case "palm-terrace":
      return {
        source: [
          {
            src: `https://prismic-io.s3.amazonaws.com/the-grand/fbe2d676-8b6e-49a7-8722-d070d933a1ef_palm-terrace.compressed.mp4`,
            type: "video/mp4",
          },
        ],
        poster: `https://images.prismic.io/the-grand/97736b17-cb8b-491d-8d82-1ff2655fa56f_palm-terrace-poster.jpg?auto=compress,format`,
      };
    default:
      return {
        source: [],
      };
  }
};

const TourTemplatePage = ({ data, status, location, pageContext }) => {
  const { frontmatter } = data.pageData;
  const { pathname } = location;
  const currentPage = slugify(pathname);
  const pageName = currentPage.replace("tour", "");

  return (
    <Layout status={status}>
      <PageHeader title={"Welcome To"} heading={frontmatter.heading} />
      <div className="page-image-full page-image-full--clean">
        <Video {...loadAssets(pageName)} />
        <VideoPlayAction source={loadAssets(pageName).source} />
      </div>
      <NumberArray
        subHead={frontmatter.numbers.subhead}
        subHeadTag="h2"
        array={frontmatter.numbers.array}
      />
      <AmenitiesArray
        subHead={frontmatter.amenities.description}
        array={frontmatter.amenities.array}
      />
      <PageSection subHead={frontmatter.upgrades.description} subHeadTag="h2">
        <div className="xs-flex xs-flex-wrap xs-flex-justify-center xs-pt4">
          {frontmatter.upgrades &&
            frontmatter.upgrades.array.map((item, i) => (
              <ScrollAnimate
                key={i}
                className={
                  "col xs-pt3 xs-col-12 sm-col-6 md-col-3 xs-flex xs-flex-column xs-flex-align-center"
                }
              >
                <h3 className="xs-text-center text-gray-lightest">
                  {item.text}
                </h3>
              </ScrollAnimate>
            ))}
        </div>
      </PageSection>
      <ScrollAnimate>
        {frontmatter.roomswitch && (
          <RoomSwitch array={frontmatter.roomswitch.array} />
        )}
      </ScrollAnimate>
      <PageSection>
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
        subHead={"Some ideas of the kind of events that work best in this room"}
        subHeadTag={"h2"}
        bottomDivider
      >
        <div className="clearfix gutters page-list xs-pt6">
          {frontmatter.events.map((item, i) => {
            return (
              <ScrollAnimate
                key={i}
                className="hash-item page-list--item col xs-col-6 md-col-4"
              >
                <h3 className="h2">{item.text}</h3>
              </ScrollAnimate>
            );
          })}
        </div>
      </PageSection>
      <PageSection
        heading={frontmatter.cta.heading}
        headingClassName={"xs-mb3"}
        buttons={frontmatter.cta.buttons}
      />
      <PageSection
        topDivider
        subHead={frontmatter.ctaAllRoom.subhead}
        subHeadClassName={"xs-mb4"}
        buttons={frontmatter.ctaAllRoom.buttons}
      />
    </Layout>
  );
};

export default TourTemplatePage;

export const basicPageQuery = graphql`
  query TourTemplatePage($id: String!) {
    pageData: markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        heading
        hero {
          childImageSharp {
            gatsbyImageData(
              placeholder: DOMINANT_COLOR
              layout: FULL_WIDTH
              formats: WEBP
              blurredOptions: { toFormat: WEBP }
            )
          }
        }
        metaDescription
        numbers {
          subhead
          array {
            number
            suffix
            prefix
            caption
            options {
              caption
              number
            }
          }
        }
        amenities {
          description
          array {
            img
            text
          }
        }
        upgrades {
          description
          array {
            text
          }
        }
        roomswitch {
          array {
            img {
              childImageSharp {
                gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  layout: FULL_WIDTH
                  formats: WEBP
                  blurredOptions: { toFormat: WEBP }
                )
              }
            }
            caption
          }
        }
        carousel {
          heading
          array {
            img {
              childImageSharp {
                gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  layout: FULL_WIDTH
                  formats: WEBP
                  blurredOptions: { toFormat: WEBP }
                )
              }
            }
            caption
          }
        }
        events {
          text
          img
        }
        cta {
          heading
          buttons {
            text
            url
          }
        }
        ctaAllRoom {
          subhead
          buttons {
            text
            url
            isSecondary
          }
        }
      }
    }
    postData: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___heading] }
      filter: { frontmatter: { templateKey: { eq: "tour-template-page" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            heading
          }
        }
      }
    }
  }
`;
