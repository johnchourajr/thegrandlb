import React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';

import { slugify } from '../components/functions/util';
import Layout from '../components/core/Layout';
import PageHeader from '../components/PageHeader';
import PageSection from '../components/PageSection';
import PageSegue from '../components/PageSegue';
import ScrollAnimate from '../components/ScrollAnimate';

const EventsIndex = ({ data, status, location }) => {
  const { frontmatter } = data.markdownRemark;
  const { pathname } = location;
  const currentPage = slugify(pathname);

  return (
    <Layout status={status}>
      <PageHeader
        title={frontmatter.title}
        heading={frontmatter.heading}
        caption={frontmatter.description}
      />
      <PageSection disabledAnimation wrapperClassName={'events-feature--wrap'}>
        {frontmatter.featureTiles.map((item, i) => {
          return (
            <ScrollAnimate
              key={i}
              className={`col xs-col-12 events-feature--item events-feature--${
                i + 1
              }`}
            >
              <Link className="" to={item.url}>
                <div className="events-feature--text">
                  <h3 className="display">{item.heading}</h3>
                  <p>{item.caption}</p>
                </div>
                <ParallaxProvider>
                  <ParallaxBanner
                    className={'events-feature--img'}
                    layers={[
                      {
                        amount: 0.2,
                        children: (
                          <div className="events-feature--img">
                            <GatsbyImage
                              image={item.img.childImageSharp.gatsbyImageData}
                            />
                          </div>
                        ),
                        slowerScrollRate: true
                      }
                    ]}
                  />
                </ParallaxProvider>
              </Link>
            </ScrollAnimate>
          );
        })}
      </PageSection>
      <PageSection topDivider>
        {frontmatter.statement.map((item, i) => {
          return (
            <p key={i} className="page-statement large xs-text-center">
              {item}
            </p>
          );
        })}
      </PageSection>
      <PageSection bottomDivider>
        <div className="clearfix gutters page-list">
          {frontmatter.exampleEvents.array.map((item, i) => {
            return (
              <ScrollAnimate
                key={i}
                className="hash-item page-list--item col xs-col-6 md-col-4"
              >
                <h2 className="-display">{item}</h2>
              </ScrollAnimate>
            );
          })}
        </div>
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

export default EventsIndex;

export const basicPageQuery = graphql`
  query EventsIndex($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        heading
        description
        featureTiles {
          heading
          caption
          url
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
        statement
        exampleEvents {
          array
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
  }
`;
