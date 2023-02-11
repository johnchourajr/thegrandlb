import React from "react";
import { graphql } from "gatsby";

import { slugify } from "../components/functions/util";
import Layout from "../components/core/Layout";
import PageHeader from "../components/PageHeader";
import PageSection from "../components/PageSection";
import PageCarousel from "../components/PageCarousel";
import PageSegue from "../components/PageSegue";
import NumberArray from "../components/NumberArray";
import FilterList from "../components/FilterList";
import Video from "../components/Video";
import VideoPlayAction from "../components/VideoPlayAction";

import Map from "../components/svg/Map";

const TourIndex = ({ data, status, location }) => {
  const { frontmatter } = data.pageData;
  const { edges: posts } = data.postData;
  const { pathname } = location;
  const currentPage = slugify(pathname);

  return (
    <Layout status={status}>
      <PageHeader title={frontmatter.title} heading={frontmatter.heading} />
      <div className="page-image-full page-image-full--clean">
        <Video
          source={[
            {
              src:
                "https://prismic-io.s3.amazonaws.com/the-grand/1dcb31ab-4e6a-4b01-bcd3-e775d11e855d_tour.compressed.mp4",
              type: "video/mp4",
            },
            {
              src:
                "https://prismic-io.s3.amazonaws.com/the-grand/b1251a58-f395-4cd6-ad39-972bb478c2c6_tour.compressed.webm",
              type: "video/webm",
            },
          ]}
          poster={
            "https://images.prismic.io/the-grand/c1815b3d-b253-4523-9001-9cf43cdba951_tour-poster.jpg?auto=compress,format"
          }
        />
        <VideoPlayAction
          source={[
            {
              src:
                "https://prismic-io.s3.amazonaws.com/the-grand/1dcb31ab-4e6a-4b01-bcd3-e775d11e855d_tour.compressed.mp4",
              type: "video/mp4",
            },
            {
              src:
                "https://prismic-io.s3.amazonaws.com/the-grand/b1251a58-f395-4cd6-ad39-972bb478c2c6_tour.compressed.webm",
              type: "video/webm",
            },
          ]}
        />
      </div>
      <PageSection heading={frontmatter.map.heading} headingTag="h2" />
      <div className="map-svg--wrapper map-svg">
        <Map />
      </div>
      <PageSection buttons={frontmatter.map.buttons} />
      <PageSection
        heading={`Yours\nBy Design`}
        headingTag="h2"
        disabledAnimation
      >
        <FilterList data={posts} targetFilter={"all"} />
      </PageSection>
      <NumberArray
        heading={frontmatter.numbers.heading}
        array={frontmatter.numbers.array}
      />
      <PageSection heading={frontmatter.carousel.heading} headingTag="h2">
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
        headingTag="h2"
        caption={frontmatter.cta.caption}
        captionClassName={"caption--small"}
        buttons={frontmatter.cta.buttons}
      />
      <PageSegue currentPage={currentPage} />
    </Layout>
  );
};

export default TourIndex;

export const basicPageQuery = graphql`
  query TourIndex($id: String!) {
    pageData: markdownRemark(id: { eq: $id }) {
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
        cta {
          heading
          caption
          buttons {
            text
            url
          }
        }
      }
    }
    postData: allMarkdownRemark(
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
            title
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
`;
