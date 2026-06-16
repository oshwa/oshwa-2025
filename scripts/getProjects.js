const { createClient } = require('contentful');

const client = createClient({
  space: process.env.CERTIFICATION_SPACE_ID,
  environment: process.env.CERTIFICATION_ENVIRONMENT,
  accessToken: process.env.CERTIFICATION_DELIVERY,
});

const getFormValuesFromContentful = () =>
  Promise.all([
    getProjectsList(),
    getValidations(),
    getExamplesFromLearningModules(),
  ]);

// get projects
const getProjectsList = () => {
  return getAllProjects();
};

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

// get validations
const getValidations = () =>
  client.getContentType(contentModelType).then(contentModel => contentModel);

const getValidationsFromContentful = contentModel => {
  const countryOptions = getValidationDropdownItems(contentModel, 'country');
  const responsiblePartyTypeOptions = getValidationDropdownItems(
    contentModel,
    'responsiblePartyType',
  );
  const primaryProjectTypes = getValidationDropdownItems(
    contentModel,
    'primaryType',
  );
  const additionalProjectTypes = getValidationCheckboxItems(
    contentModel,
    'additionalType',
  );
  const hardwareLicenses = getValidationDropdownItems(
    contentModel,
    'hardwareLicense',
  );
  const softwareLicenses = getValidationDropdownItems(
    contentModel,
    'softwareLicense',
  );
  const documentationLicenses = getValidationDropdownItems(
    contentModel,
    'documentationLicense',
  );
  return [
    {
      countryOptions,
      responsiblePartyTypeOptions,
      primaryProjectTypes,
      additionalProjectTypes,
      hardwareLicenses,
      softwareLicenses,
      documentationLicenses,
    },
  ];
};

const getValidationDropdownItems = (contentType, id) => {};
const getValidationCheckboxItems = (contentType, id) => {
  return contentType;
};

// learning modules examples
const getExamplesFromLearningModules = () =>
  getLearningModulesFromContentful()
    .then(response => getExamplesFromData(response))
    .catch(console.error);

const getLearningModulesFromContentful = () =>
  contentfulDeliveryClient.getEntries({
    content_type: 'learningModule',
    select: ['fields.moduleTitle', 'fields.examples'],
    include: 2,
  });

const getExamplesFromData = contentfulData => {
  const examples = {};
  const softwareExamples = contentfulData.items.filter(
    item => item.fields.moduleTitle === 'Software',
  );
  examples.softwareExamples = softwareExamples[0].fields.examples;
  const hardwareExamples = contentfulData.items.filter(
    item => item.fields.moduleTitle === 'Hardware',
  );
  examples.hardwareExamples = hardwareExamples[0].fields.examples;
  const documentationExamples = contentfulData.items.filter(
    item => item.fields.moduleTitle === 'Documentation',
  );
  examples.documentationExamples = documentationExamples[0].fields.examples;
  return examples;
};

module.exports = getAllProjects;
