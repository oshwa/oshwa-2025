const { createClient } = require('contentful-management');

export const client = createClient(
  {
    accessToken: process.env.CERTIFICATION_MANAGEMENT_KEY,
    environment: process.env.CERTIFICATION_ENVIRONMENT,
  },
  {
    type: 'plain',
  },
);
const spaceID = process.env.CERTIFICATION_SPACE_ID;
const environmentID = process.env.CERTIFICATION_ENVIRONMENT;
const contentModelType = 'project';

export default async function submitFormToContentful(fields) {
  try {
    let entry = await client.entry.create(
      {
        accessToken: process.env.CERTIFICATION_MANAGEMENT_KEY,
        spaceId: process.env.CERTIFICATION_SPACE_ID,
        environmentId: process.env.CERTIFICATION_ENVIRONMENT,
        contentTypeId: 'project',
      },
      fields,
    );

    return entry;
  } catch (error) {
    
    console.error('Error creating entry:', error);
    return error;
  }
}
