import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import defaultThumbnail from "../util/defaultThumbnail"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-regular-svg-icons"
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons"

const Posts = ({ pageContext }) => {
  const { group, index, first, last, additionalContext } = pageContext
  const { type, tag, category } = additionalContext

  const path = {
    default: `/`,
    category: `/category/${category}/`,
    tags: `/tags/${tag}/`,
  }

  // Pagination
  const previousUrl =
    index - 1 === 1
      ? `${path[type]}`
      : `${path[type]}page/${(index - 1).toString()}`
  const nextUrl = `${path[type]}page/${(index + 1).toString()}`

  // thumbnail and description
  const postDataList = group.map(({ node }) => {
    const category =
      node.category === "Blog" ? "Blog" : node.category.replace("Blog/", "")

    /** htmlの最初のimgタグを正規表現で取得、なければnullを格納 */
    const imageTag = node.body_html.match(/<img.*src=".*">/) || null
    /** imgタグから正規表現でURLを取得、imgタグがnullならデフォルトサムネイルを取得 */
    const thumbnail = imageTag
      ? imageTag[0].match(/https:\/\/.*\..{3}/).join(",")
      : defaultThumbnail[category]

    const html = node.body_html
    /** 本文中の最初の<p>を取得 */
    const paragraph = html.match(/<p [\s\S]*?\/p>/) || ["none"]
    /** <p>タグ内の<br>タグを取り除いたテキストを格納 */
    const description = paragraph[0]
      .replace(/<br>/g, "")
      .replace(/<\/*code>/g, "")
      .replace(/<\/*strong>/g, "")
      .replace(/<p.*">/, "")
      .replace(/<\/.>/g, "")

    return { category, thumbnail, description }
  })

  // SEO DATA
  const SEO_DATA = {
    default: {
      title: `TOP`,
      path: path[type],
    },
    category: {
      title: `${category} category`,
      path: path[type],
    },
    tags: {
      title: `${tag} topic`,
      path: path[type],
    },
  }

  return (
    <Layout>
      <SEO title={SEO_DATA[type].title} path={SEO_DATA[type].path} />
      {category && (
        <div className="mb-6">
          <span className="font-bold md:text-3xl text-xl mr-2">{category}</span>
          category post list
        </div>
      )}
      {tag && (
        <div className="mb-6">
          <span className="font-bold md:text-3xl text-xl mr-2">{tag}</span>
          topic post list
        </div>
      )}
      <div className="flex flex-wrap justify-between">
        {group.map(({ node }, i) => (
          <Link
            rel="prefetch"
            to={`/posts/${node.number}/`}
            key={node.number}
            className="post w-full md:w-1/2-8 mb-8 rounded overflow-hidden shadow flex flex-col hover:shadow-md transform hover:-translate-y-1 transition duration-500"
          >
            <div
              className="w-full h-48 flex-shrink-0 bg-cover bg-center relative"
              style={{
                backgroundImage: `url(${postDataList[i].thumbnail})`,
              }}
            >
              <span className="py-1 px-3 absolute top-0 left-0 bg-teal-500 rounded-tl rounded-br font-bold text-white text-sm">
                {postDataList[i].category}
              </span>
            </div>
            <div className="flex flex-col h-full p-4">
              <div className="mb-4 flex flex-col h-full">
                <h2 className="ellipsis-3 font-bold text-xl mb-2">
                  {node.name}
                </h2>
                <div className="ellipsis-2 mt-auto text-gray-600 text-sm">
                  {postDataList[i].description}
                </div>
              </div>
              <div className="mt-auto">
                <div className="flex flex-wrap">
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
                <div className="ml-auto mt-2 flex flex-shrink-0 items-center text-gray-600 text-sm">
                  <FontAwesomeIcon icon={faClock} className="mr-1" />
                  {node.created_at.replace(/T.+/g, "")}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex py-2">
        {!first && (
          <Link to={previousUrl} rel="prev">
            <FontAwesomeIcon icon={faAngleLeft} className="mr-1" />
            prev
          </Link>
        )}

        {!last && (
          <Link to={nextUrl} rel="next" className="ml-auto">
            next
            <FontAwesomeIcon icon={faAngleRight} className="ml-1" />
          </Link>
        )}
      </div>
    </Layout>
  )
}

export default Posts
