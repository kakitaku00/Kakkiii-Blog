import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Post = ({ data, pageContext }) => {
  const { category } = pageContext
  const post = data.esaPost

  // thumbnail
  const defaultImageSrc = `https://images.microcms-assets.io/protected/ap-northeast-1:f18fa8ff-5b5f-43d2-ac15-ec07384ec391/service/kakki-blog/media/PAK_MT9V9A6981_TP_V4.jpg`
  const imageTag = post.body_html.match(/<img.*src=".*">/) || [defaultImageSrc]
  const thumbnail = imageTag[0].match(/https:\/\/.*\..{3}/).join(",")

  // description
  const paragraph = post.body_html.match(/<p.*\/p>/) || ["none"]
  const description = paragraph[0]
    .replace(/<br>/g, "")
    .replace(/<p.*">/, "")
    .replace(/<\/.>/g, "")

  return (
    <Layout>
      <SEO
        title={post.name}
        description={description || " "}
        image={thumbnail}
        path={`/posts/${post.number}`}
        article
      />
      <section>
        <header className="mb-4 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">{post.name}</h2>
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
