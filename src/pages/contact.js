import React, { useState } from "react"
import { navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import contactApi from "../api/contactApi"

const Contact = () => {
  const [contactState, setContactState] = useState({
    name: "",
    email: "",
    body: "",
  })

  const handleChange = e => {
    setContactState({
      ...contactState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (Object.values(contactState).some(value => value === "")) {
      alert("空の項目があります")
      return
    }
    contactApi
      .post("/contact", contactState)
      .then(r => {
        navigate("/thanks")
      })
      .catch(r => {
        alert(r.response.data.error)
      })
  }

  return (
    <Layout>
      <SEO title="Contact" />
      <h2 className="text-3xl font-bold mb-4">お問い合わせ</h2>
      <p className="mb-4">
        ご依頼・お問い合わせなどございましたら、下記よりお気軽にご連絡ください。
      </p>
      <form
        className="bg-white shadow p-4 md:p-8 rounded"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block">
            <span className="block text-gray-700 mb-2">お名前</span>
            <input
              type="text"
              className="form-input py-1 px-2 block w-full border"
              placeholder="お名前"
              name="name"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            <span className="block text-gray-700 mb-2">メールアドレス</span>
            <input
              type="email"
              className="form-input py-1 px-2 block w-full border"
              placeholder="メールアドレス"
              name="email"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            <span className="block text-gray-700 mb-2">メッセージ</span>
            <textarea
              className="form-textarea py-1 px-2 block w-full border"
              rows="5"
              placeholder="メッセージ"
              name="body"
              onChange={handleChange}
            ></textarea>
          </label>
        </div>
        <div className="text-center">
          <input
            className="bg-teal-500 text-white font-bold py-2 px-4 rounded"
            type="submit"
            value="送信"
          />
        </div>
      </form>
    </Layout>
  )
}

export default Contact
