import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

const Post = ({ data, pageContext }) => {
  const { category } = pageContext
  const post = data.esaPost

  return (
    <Layout>
      <section>
        <header className="mb-4 md:mb-8">
          <h2 className="text-xl md:text-3xl">{post.name}</h2>
        </header>
        <div className="mb-6">
          <Link
            rel="prefetch"
            to={`/category/${category}`}
            className="inline-block bg-teal-500 rounded-full px-3 py-1 mr-2 text-xs md:text-sm font-semibold text-white mr-2"
          >
            {category}
          </Link>
          {post.tags.map((tag, i) => (
            <Link
              rel="prefetch"
              to={`/tags/${tag}`}
              key={i}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 mr-2 text-xs md:text-sm font-semibold text-gray-700 mr-2"
            >
              #{tag}
            </Link>
          ))}
        </div>
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{
            __html:
              post.childrenEsaPostBodyMarkdown[0].childMarkdownRemark.html,
          }}
        />
      </section>
    </Layout>
  )
}

export default Post

export const query = graphql`
  query($number: Int!) {
    esaPost(number: { eq: $number }) {
      number
      name
      body_md
      body_html
      category
      tags
      created_at
      updated_at
      childrenEsaPostBodyMarkdown {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
