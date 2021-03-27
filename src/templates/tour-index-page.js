import React from 'react';
import { graphql } from 'gatsby';

import { slugify } from '../components/functions/util';
import Layout from '../components/core/Layout';
import PageHeader from '../components/PageHeader';
import PageSection from '../components/PageSection';
import PageCarousel from '../components/PageCarousel';
import PageSegue from '../components/PageSegue';
import NumberArray from '../components/NumberArray';
import FilterList from '../components/FilterList';
import Video from '../components/Video';
import VideoPlayAction from '../components/VideoPlayAction';

import Map from '../components/svg/Map';

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
            { src: '/video/tour.compressed.mp4', type: 'video/mp4' },
            { src: '/video/tour.compressed.ogv', type: 'video/ogv' },
            { src: '/video/tour.compressed.webm', type: 'video/webm' }
          ]}
          poster={'/video/tour-poster.jpg'}
        />
        <VideoPlayAction
          source={[
            { src: '/video/tour.compressed.mp4', type: 'video/mp4' },
            { src: '/video/tour.compressed.ogv', type: 'video/ogv' },
            { src: '/video/tour.compressed.webm', type: 'video/webm' }
          ]}
        />
      </div>
      <PageSection heading={frontmatter.map.heading} />
      <div className="map-svg--wrapper map-svg">
        <Map />
      </div>
      <PageSection buttons={frontmatter.map.buttons} />
      <PageSection heading={'Yours By Design'} disabledAnimation>
        <FilterList data={posts} targetFilter={'all'} />
      </PageSection>
      <NumberArray
        heading={frontmatter.numbers.heading}
        array={frontmatter.numbers.array}
      />
      <PageSection heading={frontmatter.carousel.heading}>
        <PageCarousel
          items={[...frontmatter.carousel.array]}
          settings={{
            showIndicators: true,
            infiniteLoop: true,
            emulateTouch: true
          }}
        />
      </PageSection>
      <PageSection
        heading={frontmatter.cta.heading}
        headingClassName={'xs-mb3'}
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
            fluid(maxWidth: 1600, toFormat: WEBP) {
              ...GatsbyImageSharpFluid
            }
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
                fluid(maxWidth: 1600, toFormat: WEBP) {
                  ...GatsbyImageSharpFluid
                }
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
                fluid(maxWidth: 1600, toFormat: WEBP) {
                  ...GatsbyImageSharpFluid
                }
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
