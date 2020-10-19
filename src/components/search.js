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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = e => {
    setSearchIndex(-1)
    setKeyScrollCount(0)
    bindSearch(e.target.value)
  }

  const bindSearch = value => {
    const filterData = postsData.filter(post => {
      const postName = `${post.name} ${post.tags.join("")}`.toLowerCase()
      return postName.includes(value.trim().toLowerCase())
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
    // searchListItemHeight ... 40
    // keyScrollCount ... keyDown/Upをした回数（最小:0 最大:表示数 - 5）
    const searchList = searchListRef.current // DOM
    const height = searchList.getBoundingClientRect().height // 200
    const targetIndex = index + 1
    if (
      keyCode === keyCodes.DOWN &&
      height / searchListItemHeight < targetIndex // targetIndexが6以上
    ) {
      setKeyScrollCount(
        Math.min(
          keyScrollCount + 1,
          resultData.length - height / searchListItemHeight
        )
      )
      searchList.scrollTop =
        searchListItemHeight * (targetIndex - height / searchListItemHeight)
    } else if (keyCode === keyCodes.UP && keyScrollCount === targetIndex) {
      // スクロールした回数と選択中のindexが同じ場合に下記を実行
      setKeyScrollCount(Math.max(keyScrollCount - 1, 0))
      searchList.scrollTop = searchListItemHeight * (keyScrollCount - 1)
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
      default:
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
          onMouseDown={e => e.preventDefault()}
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
        className="search-list absolute w-full lg:w-search top-100+1 right-0 z-10 rounded shadow-md overflow-y-auto"
        ref={searchListRef}
        style={{ maxHeight: 200 }}
      >
        {searchValue && isFocus && renderSearch()}
      </div>
    </div>
  )
}

export default Search
