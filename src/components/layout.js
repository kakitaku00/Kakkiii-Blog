/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons"

import "./layout.css"
import "../styles/tailwind.css"
import "../styles/markdown.css"

import Header from "./header"
import Footer from "./footer"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="layout min-h-screen">
      <Header siteTitle={data.site.siteMetadata.title} />
      <main className="main">
        <div className="flex max-w-screen-xl mx-auto xl:px-24 lg:px-16 md:px-12 sm:px-8 px-4 md:py-12 py-4">
          <div className="lg:posts w-full relative">{children}</div>
          <div
            className="hidden lg:block ml-8 flex-shrink-0"
            style={{ width: "300px" }}
          >
            <div className="sticky top-2 hidden md:block">
              <div className="p-4 mb-4 rounded shadow">
                <div className="flex items-center mb-8">
                  <img
                    className="w-16 h-16 block rounded-full"
                    src="https://avatars0.githubusercontent.com/u/36177545?s=460&amp;v=4"
                    alt="profile image"
                  />
                  <div className="ml-2 p-2">
                    <div className="mb-2 text-lg font-bold">Kakkiii00</div>
                    <div className="flex">
                      <Link rel="prefetch" to={`#`} className="inline-block">
                        <FontAwesomeIcon
                          icon={faTwitter}
                          className="text-2xl mr-1"
                        />
                      </Link>
                      <Link rel="prefetch" to={`#`} className="inline-block">
                        <FontAwesomeIcon icon={faGithub} className="text-2xl" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-gray-600 text-sm">works</div>
                  Front end engineer
                </div>
                <div className="">
                  <div className="text-gray-600 text-sm">favorite</div>
                  Sumikko Gurashi
                </div>
              </div>

              <div className="p-4 mb-4 rounded shadow">
                <div className="mb-2 font-bold">Category</div>
                <ul>
                  <li>
                    <Link
                      rel="prefetch"
                      to={`/category/blog`}
                      className="block py-2 mb-1 text-sm md:text-md border-solid border-b border-gray-400"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      rel="prefetch"
                      to={`/category/Web`}
                      className="block py-2 mb-1 text-sm md:text-md border-solid border-b border-gray-400"
                    >
                      Web
                    </Link>
                  </li>
                  <li>
                    <Link
                      rel="prefetch"
                      to={`/category/Hobby`}
                      className="block py-2 mb-1 text-sm md:text-md border-solid border-b border-gray-400"
                    >
                      Hobby
                    </Link>
                  </li>
                  <li>
                    <Link
                      rel="prefetch"
                      to={`/category/Other`}
                      className="block py-2 mb-1 text-sm md:text-md border-solid border-b border-gray-400"
                    >
                      Other
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="p-4 mb-4 rounded shadow">
                <div className="mb-2 font-bold">Topics</div>
                <ul className="flex">
                  <li>
                    <Link
                      rel="prefetch"
                      to={`/tags/test`}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 mb-1 text-xs md:text-sm font-semibold text-gray-700 mr-2"
                    >
                      #test
                    </Link>
                  </li>
                  <li>
                    <Link
                      rel="prefetch"
                      to={`/tags/sample`}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 mb-1 text-xs md:text-sm font-semibold text-gray-700 mr-2"
                    >
                      #sample
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
