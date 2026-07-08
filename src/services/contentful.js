import { createClient } from 'contentful-management';

export const client = createClient(
  {
    accessToken: process.env.CERTIFICATION_CONTENTFUL_MANAGEMENT_KEY,
  },
  {
    type: 'plain',
  },
);

export default async function submitFormToContentful(fields) {
  return client.entry.create(
    {
      spaceId: process.env.CERTIFICATION_CONTENTFUL_SPACE_ID,
      environmentId: process.env.CERTIFICATION_CONTENTFUL_ENVIRONMENT,
      contentTypeId: 'project',
    },
    fields,
  );
}
