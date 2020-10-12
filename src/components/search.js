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
    bindSearch(e.target.value)
  }

  const bindSearch = value => {
    const filterData = postsData.filter(post => {
      console.log(post)
      return post.name.includes(value)
    })

    setResultData(filterData)
    setSearchValue(value)
  }

  const renderSearch = () => (
    <>
      {resultData.map(post => (
        <Link
          to={`/posts/${post.number}`}
          key={post.number}
          className="search-item block w-full h-auto p-2 bg-white break-all"
        >
          {post.name}
        </Link>
      ))}
    </>
  )

  return (
    <div className="relative">
      <label className="relative" htmlFor="search-input">
        <span className="absolute top-1/2 left-2 transform -translate-y-1/2">
          <FontAwesomeIcon icon={faSearch} />
        </span>
        <input
          id="search-input"
          className="w-full p-2 pl-8 border-solid border-b border-gray-400"
          type="text"
          placeholder="Please enter the text"
          onChange={handleChange}
          autoComplete="off"
        />
      </label>
      {searchValue && (
        <div
          className="absolute w-full top-100+1 right-0 z-10 rounded shadow-md overflow-y-auto"
          style={{ maxHeight: 180 }}
        >
          {renderSearch()}
        </div>
      )}
    </div>
  )
}

export default Search
