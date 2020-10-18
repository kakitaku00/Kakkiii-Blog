/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")
const createPaginatedPages = require("gatsby-paginate")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const postTemplate = path.resolve("./src/templates/post.js")
  const postsTemplate = path.resolve("./src/templates/posts.js")

  return graphql(`
    {
      allEsaPost(sort: { fields: number, order: DESC }) {
        edges {
          node {
            number
            name
            body_md
            body_html
            category
            tags
            created_at
            updated_at
          }
        }
      }
    }
  `).then(result => {
    const allEsaPost = result.data.allEsaPost

    const categoryMap = new Map()
    const tagMap = new Map()
    const postEntities = {}

    allEsaPost.edges.forEach(edge => {
      const post = edge.node
      const number = post.number
      const category = post.category.replace(/blog\//, "") || "blog"

      post.tags.forEach(tag => {
        tagMap.set(
          tag,
          tagMap.get(tag) ? tagMap.get(tag).concat(number) : [number]
        )
      })

      const numbersByCategory = categoryMap.get(category)
      categoryMap.set(
        category,
        numbersByCategory ? numbersByCategory.concat(number) : [number]
      )

      postEntities[post.number] = edge
    })

    /**
     * Template Post.js
     */
    allEsaPost.edges.forEach(edge => {
      const number = edge.node.number
      const category = edge.node.category.replace(/blog\//, "") || "blog"

      createPage({
        path: `/posts/${number}`,
        component: postTemplate,
        context: {
          number,
          category,
        },
      })
    })

    /**
     * Template Posts.js
     */
    const blogPostPerPage = 6

    createPaginatedPages({
      edges: result.data.allEsaPost.edges,
      createPage,
      pageTemplate: postsTemplate,
      pageLength: blogPostPerPage,
      pathPrefix: `/`,
      buildPath: (index, pathPrefix) =>
        index > 1 ? `/page/${index}` : `${pathPrefix}`,
      context: {
        type: "default",
      },
    })

    Array.from(categoryMap.keys()).map(category => {
      const postNumbers = categoryMap.get(category)
      createPaginatedPages({
        edges: postNumbers.map(number => postEntities[number]),
        createPage,
        pageTemplate: postsTemplate,
        pageLength: blogPostPerPage,
        pathPrefix: `category/${category}`,
        buildPath: (index, pathPrefix) =>
          index > 1 ? `${pathPrefix}/page/${index}` : `/${pathPrefix}`,
        context: {
          type: "category",
          category,
        },
      })
    })

    Array.from(tagMap.keys()).map(tag => {
      const postNumbers = tagMap.get(tag)
      createPaginatedPages({
        edges: postNumbers.map(number => postEntities[number]),
        createPage,
        pageTemplate: postsTemplate,
        pageLength: blogPostPerPage,
        pathPrefix: `tags/${tag}`,
        buildPath: (index, pathPrefix) =>
          index > 1 ? `${pathPrefix}/page/${index}` : `/${pathPrefix}`,
        context: {
          type: "tags",
          tag,
        },
      })
    })
  })
}
