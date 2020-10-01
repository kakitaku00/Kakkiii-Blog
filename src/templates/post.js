import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const Post = props => {
  const post = props.data.esaPost
  const md = post.body_md
  const html = post.childrenEsaPostBodyMarkdown[0].childMarkdownRemark.html
  const category = getBlogInfo(md, "category") || "Test"
  const thumbnail =
    getBlogInfo(md, "thumbnail") ||
    `<img src="https://images.microcms-assets.io/protected/ap-northeast-1:f18fa8ff-5b5f-43d2-ac15-ec07384ec391/service/kakki-blog/media/PAK_MT9V9A6981_TP_V4.jpg" alt="">`

  function getBlogInfo(md, item) {
    const searchRegexp = new RegExp(`${item}=.*`, "g")
    const replaceRegexp = new RegExp(`${item}=`, "g")
    const searchInfo = md.match(searchRegexp) || []
    return searchInfo.join(",").replace(replaceRegexp, "")
  }

  return (
    <Layout>
      <section>
        <header className="mb-4 md:mb-8">
          <h2 className="text-xl md:text-3xl">{post.name}</h2>
        </header>
        <div className="mb-6">
          <div class="inline-block rounded-full px-4 mr-2 bg-teal-500 text-white p-2 rounded leading-none">
            <div className="flex items-center">{category}</div>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: thumbnail,
          }}
          class="mb-4"
        ></div>
        <div
          className="markdown-body"
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
      childrenEsaPostBodyMarkdown {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
