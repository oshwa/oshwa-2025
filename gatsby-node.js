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

  const resourcePageTemplate = path.resolve(`src/templates/resource-page.js`);
  const profilePageTemplate = path.resolve(`src/templates/profile-page.js`);
  const projectPageTemplate = path.resolve(`src/templates/project-page.js`);

  // resource page query

  const allResources = await graphql(`
    query allResourcesQuery {
      allContentfulProduct {
        edges {
          node {
            id
            title
            prettyUrl
            fixedNav
            noIndex
            type
            publicationDate
            people {
              id
              displayName
              prettyUrl
            }
          }
        }
      }
    }
  `);

  allResources.data.allContentfulProduct.edges.forEach(edge => {
    createPage({
      path: `resources/${edge.node.prettyUrl}`,
      component: resourcePageTemplate,
      context: {
        id: edge.node.id,
        title: edge.node.title,
      },
    });
  });

  // profile page query
  const allPeople = await graphql(`
    query allPeopleQuery {
      allContentfulPeople {
        edges {
          node {
            id
            displayName
            prettyUrl
            title
            affiliation
            email
            twitter
            type
            photo {
              id
              file {
                url
                fileName
                contentType
              }
            }
            longDescription {
              id
              longDescription
            }
          }
        }
      }
    }
  `);

  allPeople.data.allContentfulPeople.edges.forEach(edge => {
    createPage({
      path: `people-template/${edge.node.prettyUrl}`,
      component: profilePageTemplate,
      context: {
        id: edge.node.id,
        title: edge.node.displayName,
        email: edge.node.email,
      },
    });
  });

  // project page generation
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

  // generic page generation
  const genericPageTemplate = path.resolve(`src/templates/generic-page.js`);

  // project page generation
  const allGenericPages = await graphql(`
    query allGenericPageQuery {
      allContentfulGenericPage {
        edges {
          node {
            id
            prettyUrl
            title
          }
        }
      }
    }
  `);

  allGenericPages.data.allContentfulGenericPage.edges.forEach(edge => {
    createPage({
      path: `${edge.node.prettyUrl}`,
      component: genericPageTemplate,
      context: {
        id: edge.node.id,
        prettyUrl: edge.node.prettyUrl,
        title: edge.node.title,
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