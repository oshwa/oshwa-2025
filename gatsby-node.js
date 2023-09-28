/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const fetch = require('node-fetch');

let headers = {
  headers: { Authorization: `Bearer ${process.env.OSHWA_BEARER_TOKEN}` },
};

async function getAllCertifications(offset = 0) {
  let url = `https://certificationapi.oshwa.org/api/projects?offset=${offset}`;
  let certifications = await fetch(url, headers);
  let data = await certifications.json();
  // let allCertifications = []

  if (data.items.length >= 100) {
    return data.items.concat(await getAllCertifications((offset += 100)));
  } else {
    return data.items;
  }
}

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  createPage({
    path: '/using-dsg',
    component: require.resolve('./src/templates/using-dsg.js'),
    context: {},
    defer: true,
  });
};

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  // grabs single page of values for now
  // const response = await fetch(
  //   `https://certificationapi.oshwa.org/api/projects`,
  //   {
  //     headers: { limit: 1, Authorization: `Bearer ${process.env.OSHWA_API_KEY}` },
  //   }
  // );

  // const data = await response.json();
  const allCertifications = await getAllCertifications();
  allCertifications.forEach(item => {
    createNode({
      ...item,
      id: item.oshwaUid || item.projectName,
      internal: {
        type: 'OshwaCertifications',
        contentDigest: createContentDigest(item),
      },
    });
  });
};
