import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons"
import React from "react"

import Search from "./search"

const sideNavigation = () => (
  <div className="lg:w-navi w-full lg:ml-8 lg:mt-0 mt-8 flex-shrink-0">
    <div className="lg:sticky lg:top-2">
      <div className="p-4 mb-4 rounded shadow">
        <div className="flex items-center mb-8">
          <img
            className="w-16 h-16 block rounded-full"
            src="https://avatars0.githubusercontent.com/u/36177545?s=460&amp;v=4"
            alt="profile"
          />
          <div className="ml-2 p-2">
            <div className="mb-2 text-lg font-bold">Kakkiii00</div>
            <div className="flex">
              <Link rel="prefetch" to={`#`} className="inline-block">
                <FontAwesomeIcon icon={faTwitter} className="text-2xl mr-2" />
              </Link>
              <Link rel="prefetch" to={`#`} className="inline-block">
                <FontAwesomeIcon icon={faGithub} className="text-2xl" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="text-gray-600 text-sm">about this blog</div>
          Maiking ...
        </div>
        <div className="">
          <div className="text-gray-600 text-sm">works</div>
          Front end engineer
        </div>
      </div>

      <div className="p-4 mb-4 rounded shadow">
        <div className="mb-3 font-bold">Search Posts</div>
        <Search />
      </div>

      <div className="p-4 mb-4 rounded shadow">
        <div className="mb-3 font-bold">Category</div>
        <ul>
          <li>
            <Link
              rel="prefetch"
              to={`/category/blog`}
              className="block py-2 mb-1 text-sm md:text-md border-solid border-b border-gray-400"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              rel="prefetch"
              to={`/category/Web`}
              className="block py-2 mb-1 text-sm md:text-md border-solid border-b border-gray-400"
            >
              Web
            </Link>
          </li>
          <li>
            <Link
              rel="prefetch"
              to={`/category/Hobby`}
              className="block py-2 mb-1 text-sm md:text-md border-solid border-b border-gray-400"
            >
              Hobby
            </Link>
          </li>
          <li>
            <Link
              rel="prefetch"
              to={`/category/Other`}
              className="block py-2 mb-1 text-sm md:text-md border-solid border-b border-gray-400"
            >
              Other
            </Link>
          </li>
        </ul>
      </div>

      <div className="p-4 pb-3 mb-4 rounded shadow">
        <div className="mb-3 font-bold">Pick Up Topics</div>
        <ul className="flex flex-wrap">
          <li>
            <Link
              rel="prefetch"
              to={`/tags/test`}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 mb-2 text-xs md:text-sm font-semibold text-gray-700 mr-2"
            >
              #test
            </Link>
          </li>
          <li>
            <Link
              rel="prefetch"
              to={`/tags/sample`}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 mb-2 text-xs md:text-sm font-semibold text-gray-700 mr-2"
            >
              #sample
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
)

export default sideNavigation
