export const sectionTwo = [
  {
    layout: 'group grid lg:grid-cols-4 gap-4',
    children: [
      {
        title: 'Project name',
        contentfulFieldName: 'projectName',
        formPlaceholder: 'Enter the name of your project',
        type: 'string',
        fieldType: 'input',
        requiredErrorMessage: '',
        requiredDependency: '',
        instructions: '',
        layout: 'lg:col-span-3 bold',
      },
      {
        title: 'Project version',
        contentfulFieldName: 'projectVersion',
        formPlaceholder: 'e.g. 1.0',
        type: 'string',
        fieldType: 'input',
        requiredErrorMessage: '',
        requiredDependency: '',
        instructions: '',
        layout: 'col-span-1 bold',
      },
    ],
  },
  {
    title:
      'Does your project build upon or incorporate hardware already registered with OSHWA?',
    contentfulFieldName: 'previousVersions',
    formPlaceholder: 'Enter the OSHWA UID of a previous version',
    type: 'array',
    fieldType: 'reference',
    instructions:
      'If you or others have previously registered a version of your project, or your project incorporates previously registered projects, type in the UID for that project.',
    layout: 'form-half-stacked',
  },
  {
    title: 'Project description',
    contentfulFieldName: 'projectDescription',
    formPlaceholder:
      'Provide a brief description of your project (Maximum 50000 characters)',
    type: 'string',
    fieldType: 'textarea',
    instructions: 'Please limit your response to 50000 characters',
    layout: 'form-full-stacked bold',
  },
  {
    title: 'Project website',
    contentfulFieldName: 'projectWebsite',
    formPlaceholder:
      'Enter a URL including the protocol (e.g https://example.com)',
    type: 'string',
    fieldType: 'input',
    url: true,
    urlErrorMessage: 'Please enter a valid url',
    instructions: 'Include the protocol to your URL (e.g. http:// or https://)',
    layout: 'form-full-stacked bold',
  },
  {
    title: 'Primary Project Type',
    contentfulFieldName: 'primaryType',
    formPlaceholder: 'Select a primary project type',
    type: 'string',
    fieldType: 'single_select',
    requiredErrorMessage:
      'You must select a project type. If your project doesn\'t fall into any of these types, select "Other".',
    instructions:
      'If your project doesn\'t fall into any of these types, select "Other".',
    layout: 'form-one-third bold',
    options: 'primaryType',
  },
  {
    formSection: '2',
    formOrder: '19',
    title: 'Additional Project Types',
    contentfulFieldName: 'additionalType',
    type: 'array',
    fieldType: 'checkbox_array',
    instructions: 'Select any that apply',
    layout: 'form-full-stacked bold',
    options: 'additionalType',
  },
  {
    title: 'Project Keywords',
    contentfulFieldName: 'projectKeywords',
    formPlaceholder: 'Separate keywords using commas',
    type: 'array',
    fieldType: 'string_array',
    instructions:
      'If you would like your project to be searchable by specific keywords, add them here',
    layout: 'form-full-stacked bold',
  },
  {
    title: 'Where can the documentation be found for your project?',
    contentfulFieldName: 'documentationUrl',
    formPlaceholder:
      'Enter a URL including the protocol (e.g https://example.com)',
    type: 'string',
    fieldType: 'input',
    url: true,
    urlErrorMessage: 'Please enter a valid url',
    instructions: 'Include the protocol to your URL (e.g. http:// or https://)',
    layout: 'form-one-third',
  },
  {
    title:
      'All project documentation and design files are available in the preferred format for making changes.',
    contentfulFieldName: 'availableFileFormat',
    type: 'boolean',
    fieldType: 'boolean_checkbox',
    instructions: '',
    layout: 'form-full-stacked',
  },
  {
    title:
      'Does your project incorporate or build upon other open projects that are not currently certified by OSHWA? If so, use this space to cite those projects',
    contentfulFieldName: 'citations',
    formPlaceholder:
      'Enter a URL including the protocol (e.g https://example.com)',
    type: 'json',
    fieldType: 'add_url',
    url: true,
    urlErrorMessage: 'Please enter a valid url',
    instructions: 'Include the protocol to your URL (e.g. http:// or https://)',
    layout: 'form-full-stacked',
  },
];
