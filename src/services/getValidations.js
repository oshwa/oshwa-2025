import { createClient } from 'contentful-management';

// Client init
const client = createClient({
  accessToken: process.env.CERTIFICATION_MANAGEMENT_KEY,
});

// get validations
export const getValidations = async () => {
  const validations = await client.contentType.get({
    contentTypeId: 'project',
    spaceId: process.env.CERTIFICATION_SPACE_ID,
    environmentId: process.env.CERTIFICATION_ENVIRONMENT,
  });
  const validationFields = [
    'country',
    'responsiblePartyType',
    'primaryType',
    'additionalType',
    'hardwareLicense',
    'softwareLicense',
    'documentationLicense',
  ];

  const validationFieldOptions = {};
  validationFields.forEach(field => {
    validationFieldOptions[field] = getValidationsFromContentful(
      validations,
      field,
    );
  });

  return validationFieldOptions;
};

const getValidationsFromContentful = (validations, contentfulField) => {
  return contentfulField === 'additionalType'
    ? validations.fields.filter(field => field.id === contentfulField)[0].items
        .validations[0]['in']
    : validations.fields.filter(field => field.id === contentfulField)[0]
        .validations[0]['in'];
};
