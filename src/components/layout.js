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
        <div className="flex max-w-screen-xl mx-auto p-24">
          <div className="w-full relative">{children}</div>
          <div
            className="hidden md:block pl-8 flex-shrink-0"
            style={{ width: 300 }}
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
                <div className="font-bold">Tags</div>
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
