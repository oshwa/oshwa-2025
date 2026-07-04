export const sectionThree = [
  {
    title: "What license is your project's hardware licensed under?",
    contentfulFieldName: 'hardwareLicense',
    formPlaceholder: 'Select a license',
    type: 'string',
    fieldType: 'single_select',
    requiredErrorMessage:
      'You must select a license. If your license is not listed, select "Other"',
    instructions: 'If your license is not listed, choose "Other"',
    layout: 'form-half',
    options: 'hardwareLicense',
  },
  {
    title:
      'What license is your project\'s software licensed under? Select "No software" if your project doesn\'t use software',
    contentfulFieldName: 'softwareLicense',
    formPlaceholder: 'Select a license',
    type: 'string',
    fieldType: 'single_select',
    requiredErrorMessage:
      'You must select a license. If your license is not listed, select "Other". If your project doesn\'t use software, select "No software".',
    instructions: 'If your license is not listed, choose "Other"',
    layout: 'form-half',
    options: 'softwareLicense',
  },
  {
    title: "What license is your project's documentation licensed under?",
    contentfulFieldName: 'documentationLicense',
    formPlaceholder: 'Select a license',
    type: 'string',
    fieldType: 'single_select',
    requiredErrorMessage:
      'You must select a license. If your license is not listed, select "Other"',
    instructions: 'If your license is not listed, choose "Other"',
    layout: 'form-half',
    options: 'documentationLicense',
  },
];
