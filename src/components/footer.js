import React from "react"
import { Link } from "gatsby"

const Footer = () => (
  <footer className="footer bg-teal-500 text-white text-sm mt-auto">
    <div className="max-w-screen-xl mx-auto h-full xl:px-24 lg:px-16 md:px-12 sm:px-8 px-4 py-6 flex flex-col md:flex-row md:items-center justify-between">
      <Link to={`/contact`}>CONTACT</Link>
      <div className="mt-4 md:mt-0">
        © {new Date().getFullYear()}, Kakkiii All Rights Reserved.
      </div>
    </div>
  </footer>
)
export default Footer
