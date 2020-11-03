import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import defaultThumbnail from "../util/defaultThumbnail"

const Post = ({ data, pageContext }) => {
  const { category } = pageContext
  const post = data.esaPost
  const html = post.childrenEsaPostBodyMarkdown[0].childMarkdownRemark.html

  /** htmlの最初のimgタグを正規表現で取得、なければnullを格納 */
  const imageTag = post.body_html.match(/<img.*src=".*">/) || null
  /** imgタグから正規表現でURLを取得、imgタグがnullならデフォルトサムネイルを取得 */
  const thumbnail = imageTag
    ? imageTag[0].match(/https:\/\/.*\..{3}/).join(",")
    : defaultThumbnail[category]

  /** 本文中の最初の<p>を取得 */
  const paragraph = post.body_html.match(/<p [\s\S]*?\/p>/) || ["none"]
  /** <p>タグ内の<br>タグを取り除いたテキストを格納 */
  const description = paragraph[0]
    .replace(/<br>/g, "")
    .replace(/<\/*code>/g, "")
    .replace(/<\/*strong>/g, "")
    .replace(/<p.*">/, "")
    .replace(/<\/.>/g, "")

  return (
    <Layout isPost>
      <SEO
        title={post.name}
        description={description || " "}
        image={thumbnail}
        path={`/posts/${post.number}`}
        article
      />
      <section>
        <header className="mb-4 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">{post.name}</h1>
        </header>
        <div className="mb-4">
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
        <div className="mb-4 text-gray-600 text-sm">
          <time datetime={post.created_at}>
            {post.created_at.replace(/T.+/g, "")}
          </time>
        </div>
        <div
          className="markdown-body pb-24"
          dangerouslySetInnerHTML={{
            __html: html,
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
      childrenEsaPostBodyHtml {
        childHtmlRehype {
          tableOfContents
        }
      }
      childrenEsaPostBodyMarkdown {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
