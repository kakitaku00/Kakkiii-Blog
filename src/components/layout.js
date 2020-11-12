/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import SideNavigation from "./sideNavigation"

const Layout = ({ children, isPost }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const tag = isPost ? "div" : "h1"

  return (
    <div className="layout min-h-screen flex flex-col">
      <Header siteTitle={data.site.siteMetadata.title} tag={tag} />
      <main className="main">
        <div className="flex flex-col lg:flex-row max-w-screen-xl mx-auto xl:px-16 md:px-12 sm:px-8 px-3 md:py-12 py-6">
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
