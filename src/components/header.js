import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header className="header bg-teal-500">
    <div className="max-w-screen-xl mx-auto xl:px-24 lg:px-16 md:px-12 sm:px-8 px-4 py-4 lg:py-6 flex items-center lg:justify-start justify-center">
      <h1 className="m-0">
        <Link to="/" className="text-white text-2xl font-bold">
          {siteTitle}
        </Link>
      </h1>
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
