import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle, tag }) => {
  const Logo = tag
  return (
    <header className="header bg-teal-500">
      <div className="max-w-screen-xl mx-auto xl:px-16 md:px-12 sm:px-8 px-3 py-4 md:py-6 flex items-center lg:justify-start justify-center">
        <Logo className="m-0">
          <Link to="/" className="text-white text-xl md:text-2xl font-bold">
            {siteTitle}
          </Link>
        </Logo>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
