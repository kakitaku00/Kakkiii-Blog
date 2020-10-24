import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

const PickUpTopics = () => {
  const tagsData = useStaticQuery(graphql`
    query {
      allEsaPost {
        edges {
          node {
            number
            tags
          }
        }
      }
    }
  `)

  const tags = []
  const tagMap = new Map()

  tagsData.allEsaPost.edges.forEach(edge => {
    const tags = edge.node.tags
    const number = edge.node.number
    tags.forEach(tag => {
      tagMap.set(
        tag,
        tagMap.get(tag) ? tagMap.get(tag).concat(number) : [number]
      )
    })
  })

  tagMap.forEach((value, key, map) => {
    tags.push({
      name: key,
      count: value.length,
    })
  })

  tags.sort((a, b) => {
    return b.count - a.count
  })

  return (
    <ul className="flex flex-wrap">
      {/* TODO: tagの数が増えたら表示制限も検討する */}
      {tags.map(tag => (
        <li>
          <Link
            rel="prefetch"
            to={`/tags/${tag.name}`}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 mb-2 text-xs md:text-sm font-semibold text-gray-700 mr-2"
          >
            #{tag.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default PickUpTopics
