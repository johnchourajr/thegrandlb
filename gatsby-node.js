const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

/**
 * Creates all pages
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
              menuKey
              title
              path
            }
          }
        }
      }
    }
  `);

  const pages = result.data.allMarkdownRemark.edges
  pages.forEach(({ node }) => {
    const id = node.id;
    createPage({
      path: node.fields.slug,
      tags: node.frontmatter.tags,
      component: path.resolve(
        `src/templates/${String(node.frontmatter.templateKey)}.js`
      ),
      context: {
        id,
        menuKey: node.frontmatter.menuKey,
      }
    });
  });
};


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};
