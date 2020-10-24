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
      <SEO title="Contact" path="/contact" />
      <h2 className="text-xl md:text-3xl font-bold mb-4">お問い合わせ</h2>
      <p className="mb-4">
        ご依頼・お問い合わせなどございましたら、下記よりお気軽にご連絡ください。
      </p>
      <form
        className="bg-white shadow py-4 px-2 md:p-8 rounded"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label for="name" className="block">
            <span className="block text-gray-700 mb-2">お名前</span>
            <input
              id="name"
              type="text"
              className="form-input py-1 px-2 block w-full border"
              placeholder="お名前"
              name="name"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label for="email" className="block">
            <span className="block text-gray-700 mb-2">メールアドレス</span>
            <input
              id="email"
              type="email"
              className="form-input py-1 px-2 block w-full border"
              placeholder="メールアドレス"
              name="email"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label for="body" className="block">
            <span className="block text-gray-700 mb-2">メッセージ</span>
            <textarea
              id="body"
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
