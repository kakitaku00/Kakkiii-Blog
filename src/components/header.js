import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Search from "./search"

const Header = ({ siteTitle }) => (
  <header className="header bg-teal-500">
    <div className="max-w-screen-xl mx-auto px-24 h-full flex items-center">
      <h1 className="m-0">
        <Link to="/" className="text-white text-2xl">
          {siteTitle}
        </Link>
      </h1>
      <div className="ml-auto">
        <Search />
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
