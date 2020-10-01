import React from "react"
import { Link } from "gatsby"

const Footer = () => (
  <footer className="footer bg-teal-500 text-white text-sm">
    <div className="max-w-screen-xl mx-auto px-24 h-full flex items-center justify-between">
      <Link to={`/contact`}>CONTACT</Link>
      <div>
        © {new Date().getFullYear()}, Takumi Kakinuma All Rights Reserved.
      </div>
    </div>
  </footer>
)
export default Footer
