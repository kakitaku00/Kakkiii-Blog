import React, { useState, useEffect, useRef } from "react"
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
  const [keyScrollCount, setKeyScrollCount] = useState(0)
  const [isFocus, updateIsFocus] = useState(false)

  const searchListRef = useRef(null)
  const searchListItemHeight = 40

  const keyCodes = {
    DOWN: 40,
    ENTER: 13,
    UP: 38,
  }

  useEffect(() => {
    const data = queryPostsData.allEsaPost.edges.map(post => post.node)
    setPostsData(data)
  }, [])

  const handleChange = e => {
    setSearchIndex(-1)
    setKeyScrollCount(0)
    bindSearch(e.target.value)
  }

  const bindSearch = value => {
    const filterData = postsData.filter(post => {
      return post.name.includes(value)
    })

    setResultData(filterData)
    setSearchValue(value)
  }

  const selectPost = currentIndex => {
    const items = document.querySelectorAll(".search-item")
    items.forEach((item, index) => {
      item.setAttribute("aria-selected", "false")
      if (currentIndex === index) {
        item.setAttribute("aria-selected", "true")
      }
    })
    setSearchIndex(currentIndex)
  }

  const handleScroll = (index, keyCode) => {
    const searchList = searchListRef.current
    const height = searchList.getBoundingClientRect().height
    const targetIndex = index + 1
    if (
      keyCode === keyCodes.DOWN &&
      height / searchListItemHeight < targetIndex
    ) {
      setKeyScrollCount(
        Math.min(
          keyScrollCount + 1,
          resultData.length - height / searchListItemHeight
        )
      )
      searchList.scrollTop = 40 * (targetIndex - height / searchListItemHeight)
    } else if (keyCode === keyCodes.UP && keyScrollCount === targetIndex) {
      setKeyScrollCount(Math.max(keyScrollCount - 1, 0))
      searchList.scrollTop = 40 * (keyScrollCount - 1)
    }
  }

  const handleFocus = () => {
    document.activeElement && document.activeElement.id === "search-input"
      ? updateIsFocus(true)
      : updateIsFocus(false)
  }

  const handleKeyDown = e => {
    switch (e.keyCode) {
      case keyCodes.UP:
        e.preventDefault()
        selectPost(Math.max(searchIndex - 1, -1))
        handleScroll(Math.max(searchIndex - 1, -1), e.keyCode)
        break
      case keyCodes.DOWN:
        e.preventDefault()
        selectPost(Math.min(searchIndex + 1, resultData.length - 1))
        handleScroll(
          Math.min(searchIndex + 1, resultData.length - 1),
          e.keyCode
        )
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
          className="search-item block w-full h-auto px-2 leading-10 bg-white break-all ellipsis-1"
          title={post.name}
          aria-selected="false"
          data-index={index}
          onMouseOver={() => selectPost(index)}
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
      <div
        className="search-list absolute w-full md:w-search top-100+1 right-0 z-10 rounded shadow-md overflow-y-auto"
        ref={searchListRef}
        style={{ maxHeight: 200 }}
      >
        {searchValue && isFocus && renderSearch()}
      </div>
    </div>
  )
}

export default Search
