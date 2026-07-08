const contentful = require('contentful-management');
// Client init
const client = contentful.createClient({
  accessToken: process.env.CERTIFICATION_CONTENTFUL_MANAGEMENT_KEY,
});

// get validations
const getValidations = async () => {
  const validations = await client.contentType.get({
    contentTypeId: 'project',
    spaceId: process.env.CERTIFICATION_CONTENTFUL_SPACE_ID,
    environmentId: process.env.CERTIFICATION_CONTENTFUL_ENVIRONMENT,
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
  let validationModel = validations.fields.filter(
    field => field.id === contentfulField,
  )[0];
  return validationModel.items
    ? validationModel.items.validations[0]['in']
    : validationModel.validations[0]['in'];
};

module.exports = getValidations;
