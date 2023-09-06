/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
const React = require('react');
const HeadComponents = [
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"
  />,
  <link
    href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,800"
    rel="stylesheet"
  />,
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap"
    rel="stylesheet"
  />,
  <link
    href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;700&display=swap"
    rel="stylesheet"
  />,
  <link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
  />,
];

exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: `en` });
  setHeadComponents(HeadComponents);
};
