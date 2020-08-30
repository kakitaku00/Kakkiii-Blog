/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const postTemplate = path.resolve("./src/templates/post.js")
  const postsTemplate = path.resolve("./src/templates/posts.js")
  return graphql(`
    {
      allEsaPost(sort: { fields: number, order: ASC }) {
        edges {
          node {
            number
          }
        }
      }
    }
  `).then(result => {
    result.data.allEsaPost.edges.forEach(edge => {
      createPage({
        path: `/post/${edge.node.number}`,
        component: postTemplate,
        context: {
          number: edge.node.number,
        },
      })
    })

    const blogPostPerPage = 5
    const blogPosts = result.data.allEsaPost.edges.length
    const blogPages = Math.ceil(blogPosts / blogPostPerPage)

    Array.from({ length: blogPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/posts/${i + 1}`,
        component: postsTemplate,
        context: {
          skip: blogPostPerPage * i,
          limit: blogPostPerPage,
          currentPage: i + 1,
          isFirst: i + 1 === 1,
          isLast: i + 1 === blogPages,
        },
      })
    })
  })
}
