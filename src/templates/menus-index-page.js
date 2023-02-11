import React from "react";
import { graphql, Link } from "gatsby";

import { slugify } from "../components/functions/util";
import Layout from "../components/core/Layout";
import PageHeader from "../components/PageHeader";
import PageSection from "../components/PageSection";
import PageCarousel from "../components/PageCarousel";
import PageSegue from "../components/PageSegue";

const MenusIndex = ({ data, status, location }) => {
  const { frontmatter } = data.markdownRemark;
  const { pathname } = location;
  const currentPage = slugify(pathname);

  return (
    <Layout status={status}>
      <PageHeader
        title={frontmatter.title}
        heading={frontmatter.heading}
        caption={frontmatter.caption}
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
      <PageSection caption="We offer a variety of menu options to suit the tastes and needs of all of our guests. ">
        <div className="clearfix gutters menu-list">
          {frontmatter.menus.array.map((item, i) => {
            return (
              <div
                key={i}
                className="menu-list--item col xs-col-8 xs-offset-2 md-col-3 md-offset-2 lg-col-3 lg-offset-2"
              >
                <Link to={item.path} className="menu-list--item--inner">
                  <div className="hash-item">
                    <h2 className="h2">{item.name}</h2>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </PageSection>
      <PageSection
        heading={"Need something custom?"}
        headingClassName={"h3"}
        headingTag={"h2"}
        caption={
          "Our team will work with you to create a custom menu that meets your specific needs and ensures that your event is a success. We offer a range of dietary options, including vegetarian, vegan, gluten-free, as well as cultural dishes."
        }
        captionClassName={"caption--small"}
        bottomDivider
      />
      <PageSection
        heading={frontmatter.cta.heading}
        headingClassName={"xs-mb3"}
        buttons={frontmatter.cta.buttons}
      />
      <PageSegue currentPage={currentPage} />
    </Layout>
  );
};

export default MenusIndex;

export const basicPageQuery = graphql`
  query MenusIndex($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        heading
        description
        caption
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
        menus {
          array {
            name
            path
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
  }
`;
