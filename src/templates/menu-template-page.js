import React from "react";
import ReactGA from "react-ga";
import Scrollchor from "react-scrollchor";

import { graphql, withPrefix } from "gatsby";

import Layout from "../components/core/Layout";
import PageHeader from "../components/PageHeader";
import PageSection from "../components/PageSection";
import PageSegue from "../components/PageSegue";
import MenuTable from "../components/MenuTable";

import { slugify } from "../components/functions/util";

function printAction(menu) {
  window.print();

  ReactGA.event({
    category: "MenuPrint",
    action: menu,
  });
}

const MenuTemplatePage = ({
  data: { markdownRemark, prismicMenusMenuCollection },
  status,
}) => {
  const { frontmatter } = markdownRemark;
  const menuData = prismicMenusMenuCollection?.data;
  const path = "/img/icons/menu/printer.svg";

  if (prismicMenusMenuCollection)
    return (
      <Layout status={status}>
        <PageHeader title={frontmatter.title} heading={menuData.page_title}>
          <img
            src="/img/menus/header-pattern.png"
            className="print only-print"
            alt="Logo"
          />
        </PageHeader>

        <PageSection
          subHead={menuData.page_description}
          subHeadClassName={"xs-px4 xs-pb4 no-print"}
        >
          <div className="xs-mb5">
            <p className="text-gray-lightest xs-text-center">
              {menuData.page_disclaimer}
            </p>
          </div>
          <div className="print-button no-print">
            <button
              onClick={() => printAction(menuData.page_title)}
              className="button button--small button--secondary button--third"
            >
              <p>
                Print This Menu{" "}
                <img
                  style={{ width: 20, height: 24 }}
                  src={`${withPrefix(path)}`}
                  alt="print icon"
                />
              </p>
            </button>
          </div>
        </PageSection>
        {menuData.group.length > 1 && (
          <PageSection>
            <div id={"menutop"} className="button-group no-print">
              {menuData.group.map(({ menu_link }, i) => {
                const group = menu_link.document?.data;
                return (
                  <React.Fragment key={i}>
                    <Scrollchor
                      to={`#${group.page_title && slugify(group.page_title)}`}
                      animate={{ offset: -150, duration: 600 }}
                      className={`button button--secondary button-group__item`}
                    >
                      {group.page_title}
                    </Scrollchor>
                  </React.Fragment>
                );
              })}
            </div>
          </PageSection>
        )}

        <section className="section">
          <div className="wrapper">
            <MenuTable data={menuData} />
          </div>
          {menuData.group.length > 1 && (
            <div className="wrapper xs-py6 xs-text-center">
              <Scrollchor
                to={`#menutop`}
                animate={{ offset: -150, duration: 600 }}
              >
                ⇡ Back to Top
              </Scrollchor>
            </div>
          )}
        </section>

        <PageSection
          heading={"Tell Us About\nYour Event"}
          headingClassName={"xs-mb3"}
          headingTag={"h2"}
          buttons={[{ text: "Plan Your Private Event", url: "/inquire/" }]}
        />
        <PageSegue currentPage={"menus"} />
      </Layout>
    );
  else return <></>;
};

export default MenuTemplatePage;

export const menuTemplatePageQuery = graphql`
  query MenuTemplatePage($id: String!, $menuKey: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        heading
        subhead
        data
      }
    }
    prismicMenusMenuCollection(uid: { eq: $menuKey }) {
      id
      tags
      data {
        page_title
        page_description
        page_disclaimer
        group {
          menu_link {
            id
            document {
              ... on PrismicMenusMenu {
                id
                data {
                  page_title
                  page_description {
                    raw
                  }
                  page_disclaimer {
                    raw
                  }
                  body {
                    ... on PrismicMenusMenuDataBodyMenuHeading {
                      id
                    }
                    ... on PrismicMenusMenuDataBodyMenuGroup {
                      id
                      primary {
                        title {
                          raw
                          text
                        }
                        description {
                          raw
                          text
                        }
                        caption {
                          raw
                          text
                        }
                      }
                      items {
                        title {
                          text
                          raw
                        }
                        price_per
                        price_min
                        price_max
                        description {
                          text
                          raw
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
