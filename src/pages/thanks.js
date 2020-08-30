import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Thanks = () => {
  return (
    <Layout>
      <SEO title="Thanks" />
      <h2 className="text-3xl font-bold mb-4">お問い合わせ</h2>
      <p className="mb-4">お問い合わせありがとうございました。</p>
      <Link to={`/`} className="text-teal-500">
        HOME
      </Link>
    </Layout>
  )
}

export default Thanks
