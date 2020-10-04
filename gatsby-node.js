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
  const searchedTemplate = path.resolve("./src/templates/searched.js")

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
      console.log("category", category)

      post.tags.forEach(tag => {
        tagMap.set(
          tag,
          tagMap.get(tag) ? tagMap.get(tag).concat(number) : [number]
        )
      })

      const numbersByCategory = categoryMap.get(category)
      console.log("numberByCategory", numbersByCategory)
      categoryMap.set(
        category,
        numbersByCategory ? numbersByCategory.concat(number) : [number]
      )

      postEntities[post.number] = edge
    })

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

    const blogPostPerPage = 5
    const blogPosts = allEsaPost.edges.length
    const blogPages = Math.ceil(blogPosts / blogPostPerPage)

    Array.from({ length: blogPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/page/${i + 1}`,
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

    Array.from(categoryMap.keys()).map(category => {
      const postNumbers = categoryMap.get(category)
      console.log("postNumbers", postNumbers)
      createPaginatedPages({
        edges: postNumbers.map(number => postEntities[number]),
        createPage,
        pageTemplate: searchedTemplate,
        pageLength: 3, // TODO: ページングデバッグ用に表示数を制限
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
        pageTemplate: searchedTemplate,
        pageLength: 3, // TODO: ページングデバッグ用に表示数を制限
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
