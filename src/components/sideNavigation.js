import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons"
import React from "react"

import Search from "./search"
import PickUpTopics from "./pickUpTopics"

const sideNavigation = () => (
  <div className="lg:w-navi w-full lg:ml-8 lg:mt-0 mt-8 flex-shrink-0">
    <div className="lg:sticky lg:top-2">
      <div className="p-4 mb-4 rounded shadow">
        <div className="flex items-center mb-4">
          <img
            className="w-16 h-16 block rounded-full"
            src="https://pbs.twimg.com/profile_images/1051118922974388226/8dFFoG6O_400x400.jpg"
            alt="profile"
          />
          <div className="ml-2 p-2">
            <div className="mb-2 text-lg font-bold">Kakkiii00</div>
            <div className="flex">
              <a
                href="https://twitter.com/kakkiii00"
                className="inline-block mr-2"
                target="_blank"
                rel="noopener noreferrer prefetch"
              >
                <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
              </a>
              <a
                href="https://github.com/kakitaku00"
                className="inline-block"
                target="_blank"
                rel="noopener noreferrer prefetch"
              >
                <FontAwesomeIcon icon={faGithub} className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <div className="text-gray-600 text-sm">about</div>
          <Link
            rel="prefetch"
            to={`/posts/460`}
            className="text-sm underline hover:no-underline"
          >
            このブログについて
          </Link>
        </div>
        <div className="">
          <div className="text-gray-600 text-sm">works</div>
          <span className="text-sm">Front-end Engineer</span>
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
              to={`/category/Blog`}
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
        <PickUpTopics />
      </div>
    </div>
  </div>
)

export default sideNavigation
