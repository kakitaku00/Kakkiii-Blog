import React from "react"
import { Link } from "gatsby"

const Footer = () => (
  <footer className="footer bg-teal-500 text-white text-sm mt-auto">
    <div className="max-w-screen-xl mx-auto h-full xl:px-24 lg:px-16 md:px-12 sm:px-8 px-4 py-4 lg:py-6 flex items-center justify-between">
      <Link to={`/contact`}>CONTACT</Link>
      <div>
        © {new Date().getFullYear()}, Takumi Kakinuma All Rights Reserved.
      </div>
    </div>
  </footer>
)
export default Footer
