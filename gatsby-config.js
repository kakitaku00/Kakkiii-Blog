let activeEnv = process.env.ACTIVE_ENV || process.env.NODE_ENV || "development"
require("dotenv").config({
  path: `.env.${activeEnv}`,
})

module.exports = {
  siteMetadata: {
    title: `Kakkiii-Blog`,
    description: `Kakkiii's blog`,
    author: `@kakkiii00`,
    url: `https://kakkiii-blog.dev`,
    siteUrl: `https://kakkiii-blog.dev`,
    twitterUsername: `@kakkiii00`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
        head: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    "gatsby-plugin-postcss",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-twitter`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/thanks/`, `/using-typescript/`],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Kakkiii-Blog`,
        short_name: `Kakkiii-Blog`,
        start_url: `/`,
        background_color: `#38b2ac`,
        theme_color: `#38b2ac`,
        display: `minimal-ui`,
        icon: `src/images/k-icon.png`,
      },
    },
    {
      resolve: `@suin/gatsby-source-esa`,
      options: {
        team: process.env.TEAM_NAME,
        token: process.env.ESA_TOKEN,
        posts: {
          q: `wip:false in:Blog`,
          include: [`comments`, `stargazers`],
          sort: `number`,
          order: `asc`,
        },
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: ["Table of Contents", "TOC", "目次"],
              tight: false,
              toHeading: 3,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              elements: [`h2`, `h3`],
            },
          },
          {
            resolve: "gatsby-remark-code-titles",
            options: {
              className: "code-title",
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-transformer-rehype`,
      options: {
        /*...*/
      },
    },
  ],
}
