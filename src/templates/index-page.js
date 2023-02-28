import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

// Components
import Layout from "../components/core/Layout";
import PageHero from "../components/PageHero";
import PageSection from "../components/PageSection";
import PageCta from "../components/PageCta";
import PageCarousel from "../components/PageCarousel";
import MapSection from "../components/MapSection";
import NumberArray from "../components/NumberArray";
import RatingsSection from "../components/RatingsSection";
import ReviewsSection from "../components/ReviewsSection";
import ScrollAnimate from "../components/ScrollAnimate";
import HomePromo from "../components/HomePromo";

// Data
import { siteDetails } from "../data/siteDetails";

// Util Functions
import * as util from "../components/functions/util";

// Page
const IndexPage = ({ data, status, siteBanner }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout status={status}>
      <PageHero
        title={frontmatter.title}
        heading={frontmatter.heading}
        video={{
          source: [
            {
              src:
                "https://prismic-io.s3.amazonaws.com/the-grand/e21bc953-a445-4ff1-976d-1978f84e281a_home.compressed.mp4",
              type: "video/mp4",
            },
            {
              src:
                "https://prismic-io.s3.amazonaws.com/the-grand/846e52be-fb23-4b39-86de-4ceec3508fb3_home.compressed.webm",
              type: "video/webm",
            },
          ],
          poster:
            "https://images.prismic.io/the-grand/78e1eff7-4ec1-4293-b5ad-e2b14c6c6e51_home-poster.jpg?auto=compress,format",
        }}
        img="/img/placeholder--front-img.jpg"
        buttons={[
          {
            text: "Make an Inquiry",
            url: "/inquire?ref=hero/",
            event: {
              category: "InquireAction",
              action: "homeInquireAction",
            },
          },
          {
            text: "Take a Tour",
            url: "/tour/",
            event: {
              category: "TourAction",
              action: "homeTourAction",
            },
            isSecondary: true,
          },
        ]}
      />
      <PageSection
        heading={frontmatter.subhead}
        headingTag="h2"
        caption={frontmatter.subheadCaption}
        captionClassName="caption--small"
      />

      <PageSection wrapperClassName="page-feature--wrapper">
        {frontmatter.topFeatures.map((item, i) => {
          return (
            <ScrollAnimate
              delay={150 * i}
              key={i}
              className="page-feature page-feature--lower-bar col xs-col-12 md-col-4"
            >
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <h3 className="h1 xs-text-center">{item.text}</h3>
              </a>
            </ScrollAnimate>
          );
        })}
      </PageSection>

      <HomePromo frontmatter={frontmatter} />

      <MapSection
        heading={frontmatter.map.heading}
        caption={frontmatter.map.caption}
        mapLink={util.addressLink(siteDetails.address1, siteDetails.address2)}
        address1={siteDetails.address1}
        address2={siteDetails.address2}
        features={frontmatter.map.features}
      />
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
      <NumberArray
        heading={frontmatter.numbers.heading}
        headingTag="h2"
        caption={frontmatter.numbers.caption}
        array={frontmatter.numbers.array}
      />
      <PageSection
        heading={`We're\nValidated`}
        sectionClassName="section--flush-bottom"
      >
        <RatingsSection />
      </PageSection>
      <PageSection sectionClassName="section--flush-top">
        <ReviewsSection />
      </PageSection>
      <PageCta
        heading={frontmatter.ctaLower.heading}
        caption={frontmatter.ctaLower.caption}
        captionClassName="caption--small"
        buttons={frontmatter.ctaLower.buttons}
        img={frontmatter.ctaLower.img}
      />
      <PageSection
        heading={frontmatter.menuFeature.heading}
        headingClassName={"xs-mb3"}
        caption={frontmatter.menuFeature.caption}
        captionClassName="caption--small"
        buttons={frontmatter.menuFeature.buttons}
        disabledAnimation
      >
        <div className="menu-feature--wrap gutters clearfix">
          <ScrollAnimate
            className={`col xs-offset-1 xs-col-10 md-ml0 md-col-7 xs-my2 menu-feature--1`}
          >
            <GatsbyImage
              image={
                frontmatter.menuFeature.imgs[0].childImageSharp.gatsbyImageData
              }
              alt="food"
              title="food"
            />
          </ScrollAnimate>
          <ScrollAnimate
            className={`col xs-offset-1 xs-col-10 md-ml0 md-col-5 xs-my2 menu-feature--2`}
          >
            <GatsbyImage
              image={
                frontmatter.menuFeature.imgs[1].childImageSharp.gatsbyImageData
              }
              alt="food"
              title="food"
            />
          </ScrollAnimate>
          <ScrollAnimate
            className={`col xs-offset-1 xs-col-10 md-offset-1 md-col-6 lg-offset-3 lg-col-4 xs-my2 menu-feature--3`}
          >
            <GatsbyImage
              image={
                frontmatter.menuFeature.imgs[2].childImageSharp.gatsbyImageData
              }
              alt="food"
              title="food"
            />
          </ScrollAnimate>
        </div>
      </PageSection>
    </Layout>
  );
};

export default IndexPage;

export const basicPageQuery = graphql`
  query IndexPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        heading
        headingButtons {
          text
          url
          isSecondary
        }
        subhead
        subheadCaption
        promo {
          accent
          heading
          caption
          buttons {
            text
            url
            event {
              category
              action
              label
            }
          }
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
        }
        topFeatures {
          text
          url
        }
        ctaUpper {
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
          accent
          heading
          buttons {
            text
            url
            event {
              category
              action
            }
          }
        }
        map {
          heading
          caption
          features {
            text
            url
            event {
              category
              action
            }
          }
        }
        carousel {
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
        numbers {
          heading
          caption
          array {
            prefix
            number
            suffix
            caption
          }
        }
        ctaLower {
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
          accent
          heading
          caption
          buttons {
            text
            url
            event {
              category
              action
            }
          }
        }
        menuFeature {
          heading
          caption
          buttons {
            text
            url
            isSecondary
          }
          imgs {
            childImageSharp {
              gatsbyImageData(
                placeholder: DOMINANT_COLOR
                layout: FULL_WIDTH
                formats: WEBP
                blurredOptions: { toFormat: WEBP }
              )
            }
          }
        }
      }
    }
  }
`;
