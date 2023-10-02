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

const path = require(`path`);

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

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  // createPage({
  //   path: '/using-dsg',
  //   component: require.resolve('./src/templates/using-dsg.js'),
  //   context: {},
  //   defer: true,
  // });
  const projectPageTemplate = path.resolve(`src/templates/project-page.js`);
  const allProjects = await graphql(`
    query allOshwaCertificationsQuery {
      allOshwaCertifications {
        edges {
          node {
            id
            oshwaUid
            projectName
            projectWebsite
            projectDescription
          }
        }
      }
    }
  `);

  allProjects.data.allOshwaCertifications.edges.forEach(edge => {
    createPage({
      path: `projects/${edge.node.id.toLowerCase()}`,
      component: projectPageTemplate,
      context: {
        id: edge.node.id,
        title: edge.node.projectName,
      },
    });
  });
};

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
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
