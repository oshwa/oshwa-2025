const { createClient } = require('contentful');

const client = createClient({
  space: process.env.CERTIFICATION_SPACE_ID,
  environment: process.env.CERTIFICATION_ENVIRONMENT,
  accessToken: process.env.CERTIFICATION_DELIVERY,
});

const getAllProjects = (limitOption = 1000, skipOption = 0, allData) => {
  let limit = limitOption;
  let skip = skipOption;
  allData = allData || [];
  return client
    .getEntries({
      content_type: 'project',
      skip,
      limit,
      order: 'fields.oshwaUid',
      select: [
        'fields.oshwaUid',
        'fields.responsibleParty',
        'fields.projectName',
      ],
    })
    .then(response => {
      allData = allData.concat(response.items);
      if (response.items.length == limit) {
        return getAllProjects(limit, limit + skip, allData);
      }
      return allData.map(data => ({
        id: data.sys.id,
        oshwaUid: data.fields.oshwaUid,
        responsibleParty: data.fields.responsibleParty,
        projectName: data.fields.projectName,
      }));
    })
    .catch(console.error);
};

module.exports = getAllProjects;
