const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  return graphql(`
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
              title
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    // posts.forEach(edge => {
    //   const prev = index === 0 ? false : posts[index - 1].edge.node
    //   const next =
    //     index === posts.length - 1 ? false : posts[index + 1].edge.node
    //   const id = edge.node.id
    //   createPage({
    //     path: edge.node.fields.slug,
    //     // tags: edge.node.frontmatter.tags,
    //     component: path.resolve(
    //       `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
    //     ),
    //     // additional data can be passed via context
    //     context: {
    //       id,
    //       prev,
    //       next
    //     },
    //   })
    // })

    // Create pages for each markdown file.
    posts.forEach(({ node }, index) => {
      const prev = index === 0 ? false : posts[index - 1].node
      const next =
        index === posts.length - 1 ? false : posts[index + 1].node
      const id = node.id
      createPage({
        path: node.fields.slug,
        component: path.resolve(
          `src/templates/${String(node.frontmatter.templateKey)}.js`
        ),
        context: {
          id,
          prev,
          next
        }
      })
    })

    return posts
  })
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: 'react-flickity-component',
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
