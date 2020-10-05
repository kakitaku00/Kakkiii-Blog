import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-regular-svg-icons"
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons"

const Posts = ({ data, pageContext }) => {
  const allPostHtml = data.allEsaPost.edges.map(({ node }) => node.body_html)
  const postDataList = allPostHtml.map(html => {
    const defaultImageTag = `<img src="https://images.microcms-assets.io/protected/ap-northeast-1:f18fa8ff-5b5f-43d2-ac15-ec07384ec391/service/kakki-blog/media/PAK_MT9V9A6981_TP_V4.jpg" alt="">`
    const imageTag = html.match(/<img.*src=".*">/) || [defaultImageTag]
    const thumbnail = imageTag[0].match(/https:\/\/.*\..{3}/).join(",")
    const paragraph = html.match(/<p.*\/p>/) || ["none"]
    const description = paragraph[0]
      .replace(/<br>/g, "")
      .replace(/<p.*">/, "")
      .replace(/<\/.>/g, "")
    return { thumbnail, description }
  })

  return (
    <Layout>
      <SEO title={"Top"} />
      {data.allEsaPost.edges.map(({ node }, i) => (
        <Link
          rel="prefetch"
          to={`/posts/${node.number}`}
          key={node.number}
          className="post w-full mb-8 rounded overflow-hidden shadow flex flex-col md:flex-row hover:shadow-md transform hover:-translate-y-1 transition duration-500"
        >
          <div
            className="w-full md:w-1/3 h-40 md:h-auto bg-cover"
            style={{
              backgroundImage: `url(${postDataList[i].thumbnail})`,
            }}
          ></div>
          <div className="w-full md:w-2/3 flex flex-col">
            <div className="px-4 md:px-6 py-4">
              <div className="font-bold text-xl mb-2">{node.name}</div>
              <div className="truncate text-gray-500 text-sm">
                {postDataList[i].description}
              </div>
            </div>
            <div className="px-4 md:px-6 pt-4 pb-3 mt-auto flex">
              <div className="flex flex-wrap items-start">
                {node.tags.length ? (
                  node.tags.map((tag, i) => (
                    <span
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 mb-1 text-xs md:text-sm font-semibold text-gray-700 mr-2"
                      key={i}
                    >
                      #{tag}
                    </span>
                  ))
                ) : (
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 mb-1 text-xs md:text-sm font-semibold text-gray-700 mr-2">
                    #blog
                  </span>
                )}
              </div>
              <div className="ml-auto mb-1 flex flex-shrink-0 self-end items-center text-gray-500 text-sm">
                <FontAwesomeIcon icon={faClock} />
                {node.created_at.replace(/T.+/g, "")}
              </div>
            </div>
          </div>
        </Link>
      ))}
      <div className="flex py-2">
        {!pageContext.isFirst && (
          <Link
            to={
              pageContext.currentPage === 2
                ? `/`
                : `/page/${pageContext.currentPage - 1}`
            }
            rel="prev"
          >
            <FontAwesomeIcon icon={faAngleLeft} className="mr-1" />
            prev
          </Link>
        )}

        {!pageContext.isLast && (
          <Link
            to={`/page/${pageContext.currentPage + 1}/`}
            rel="next"
            className="ml-auto"
          >
            next
            <FontAwesomeIcon icon={faAngleRight} className="ml-1" />
          </Link>
        )}
      </div>
    </Layout>
  )
}

export default Posts

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allEsaPost(
      sort: { fields: number, order: DESC }
      limit: $limit
      skip: $skip
    ) {
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
`
