/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"

import "../styles/layout.css"
import "../styles/tailwind.css"
import "../styles/markdown.css"

import Header from "./header"
import Footer from "./footer"
import SideNavigation from "./sideNavigation"

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
    <div className="layout min-h-screen flex flex-col">
      <Header siteTitle={data.site.siteMetadata.title} />
      <main className="main">
        <div className="flex flex-col lg:flex-row max-w-screen-xl mx-auto xl:px-24 lg:px-16 md:px-12 sm:px-8 px-4 md:py-12 pb-4 pt-8">
          <div className="lg:w-posts w-full relative">{children}</div>
          <SideNavigation />
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
