/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const resolveConfig = require('tailwindcss/resolveConfig');
const tailwindConfig = require('./tailwind.config.js');

const fullConfig = resolveConfig(tailwindConfig);

module.exports = {
  siteMetadata: {
    title: `Objectively Gatsby Starter`,
    description: ``,
    author: ``,
    siteUrl: `http://example.com`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-postcss`,
    `gatsby-transformer-remark`,
    // {
    //   resolve: `gatsby-transformer-remark`,
    //   options: {
    //     plugins: [
    //       {
    //         resolve: `gatsby-remark-autolink-headers`,
    //         options: {
    //           offsetY: `1500`,
    //           className: `custom-class`,
    //         },
    //       },
    //     ],
    //   },
    // },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        // Configure SASS to process Tailwind
        postCssPlugins: [require('tailwindcss')],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`)(tailwindConfig),
          require(`autoprefixer`),
          ...(process.env.NODE_ENV === `production`
            ? [require(`cssnano`)]
            : []),
        ],
      },
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [
          `https://fonts.googleapis.com`,
          `https://fonts.gstatic.com`,
        ],
        web: [
          {
            name: `Antonio`,
            file: `https://fonts.googleapis.com/css2?family=Antonio:wght@700&display=swap`,
          },
          {
            name: `Noto Sans`,
            file: `https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap`,
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-lunr`,
      options: {
        languages: [
          {
            // ISO 639-1 language codes. See https://lunrjs.com/guides/language_support.html for details
            name: 'en',
            // A function for filtering nodes. () => true by default
            filterNodes: node => {
              if (node.internal.type === 'ContentfulProduct') {
                console.log(Object.keys(node));
              }
              return node.internal.type === 'ContentfulProduct';
            },
            // Add to index custom entries, that are not actually extracted from gatsby nodes
            customEntries: [
              {
                title: 'Pictures',
                content: 'awesome pictures',
                url: '/pictures',
              },
            ],
          },
        ],
        // Fields to index. If store === true value will be stored in index file.
        // Attributes for custom indexing logic. See https://lunrjs.com/docs/lunr.Builder.html for details
        fields: [
          { name: 'title', store: true, attributes: { boost: 20 } },
          { name: 'publicationDate', store: true },
          { name: 'type', store: true },
          { name: 'prettyUrl', store: true },
        ],
        // How to resolve each field's value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields' values
          ContentfulProduct: {
            title: node => node.title,
            publicationDate: node => node.publicationDate,
            type: node => node.type,
            prettyUrl: node => node.prettyUrl,
          },
        },
        //custom index file name, default is search_index.json
        filename: 'search_index.json',
        //custom options on fetch api call for search_ındex.json
        fetchOptions: {
          credentials: 'same-origin',
        },
      },
    },
  ],
};
