import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const Post = props => {
  const post = props.data.esaPost
  const html = post.childrenEsaPostBodyMarkdown[0].childMarkdownRemark.html
  return (
    <Layout>
      <section>
        <header className="mb-4 md:mb-8">
          <h2 className="text-xl md:text-3xl">{post.name}</h2>
        </header>
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
