import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery, Link, navigate } from "gatsby"

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
  const [searchIndex, setSearchIndex] = useState(-1)
  const [isFocus, updateIsFocus] = useState(false)

  const keyCodes = {
    DOWN: 40,
    ENTER: 13,
    UP: 38,
  }

  useEffect(() => {
    const data = queryPostsData.allEsaPost.edges.map(post => post.node)
    setPostsData(data)
  }, [])

  useEffect(() => {
    selectPost()
  }, [searchIndex])

  const handleChange = e => {
    setSearchIndex(-1)
    bindSearch(e.target.value)
  }

  const bindSearch = value => {
    const filterData = postsData.filter(post => {
      return post.name.includes(value)
    })

    setResultData(filterData)
    setSearchValue(value)
  }

  const selectPost = () => {
    const items = document.querySelectorAll(".search-item")
    items.forEach((item, index) => {
      item.setAttribute("aria-selected", "false")
      if (searchIndex === index) {
        item.setAttribute("aria-selected", "true")
      }
    })
  }

  const handleFocus = () => {
    document.activeElement && document.activeElement.id === "search-input"
      ? updateIsFocus(true)
      : updateIsFocus(false)
  }

  const handleKeyDown = e => {
    switch (e.keyCode) {
      case keyCodes.UP:
        setSearchIndex(Math.max(searchIndex - 1, -1))
        e.preventDefault()
        break
      case keyCodes.DOWN:
        setSearchIndex(Math.min(searchIndex + 1, resultData.length - 1))
        e.preventDefault()
        break
      case keyCodes.ENTER:
        if (searchIndex < 0) {
          return
        }
        navigate(`/posts/${resultData[searchIndex].number}`)
        setSearchValue("")
        break
    }
  }

  const renderSearch = () => (
    <>
      {resultData.map((post, index) => (
        <Link
          to={`/posts/${post.number}`}
          key={post.number}
          className="search-item block w-full h-auto p-2 bg-white break-all"
          aria-selected="false"
          data-index={index}
          onMouseOver={() => setSearchIndex(index)}
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
          onFocus={handleFocus}
          onBlur={handleFocus}
          onKeyDown={handleKeyDown}
        />
      </label>
      {searchValue && isFocus && (
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
