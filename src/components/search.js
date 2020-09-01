import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

const Search = () => {
  const queryPostsData = useStaticQuery(graphql`
    query {
      allEsaPost {
        edges {
          node {
            number
            name
            tags
          }
        }
      }
    }
  `)

  const [searchValue, setSearchValue] = useState("")
  const [postsData, setPostsData] = useState([])
  const [resultData, setResultData] = useState([])

  useEffect(() => {
    const data = queryPostsData.allEsaPost.edges.map(post => post.node)
    setPostsData(data)
  }, [])

  const handleChange = e => {
    setSearchValue(e.target.value)
    bindSearch()
  }

  const bindSearch = () => {
    const filterData = postsData.filter(post => {
      // TODO: 小文字/大文字対応
      return post.name.includes(searchValue) || post.tags.includes(searchValue)
    })
    setResultData(filterData)
  }

  const renderSearch = () => (
    <>
      {resultData.map(post => (
        <div className="w-full rounded" key={post.number}>
          <Link
            to={`/posts/${post.number}`}
            className="block w-full h-full p-2"
          >
            {post.name}
          </Link>
        </div>
      ))}
    </>
  )

  return (
    <div className="shadow">
      <form className="">
        <label className="flex relative" htmlFor="search-input">
          <span className="absolute top-inset-1/2 left-2 -translate-y-1/2">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <input
            id="search-input"
            className="w-full rounded p-2 pl-8"
            type="text"
            placeholder="キーワードを入力"
            onChange={handleChange}
          />
        </label>
      </form>
      {searchValue && <div className="mt-2">{renderSearch()}</div>}
    </div>
  )
}

export default Search
