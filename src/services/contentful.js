import { createClient } from 'contentful-management';

export const client = createClient(
  {
    accessToken: process.env.CERTIFICATION_MANAGEMENT_KEY,
    environment: process.env.CERTIFICATION_ENVIRONMENT,
  },
  {
    type: 'plain',
  },
);

export default async function submitFormToContentful(fields) {
  return client.entry.create(
    {
      spaceId: process.env.CERTIFICATION_SPACE_ID,
      environmentId: process.env.CERTIFICATION_ENVIRONMENT,
      contentTypeId: 'project',
    },
    fields,
  );
}
