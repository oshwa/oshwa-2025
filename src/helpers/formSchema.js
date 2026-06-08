import * as z from 'zod';

// Define the validation rules across fields
export const formSchema = z
  .object({
    oshwaUid: z.string().nullable(), // Explicitly allow null
    responsiblePartyType: z
      .string()
      .min(1, { message: 'Responsible Party Type is required' })
      .max(256, { message: 'Maximum length is 256 characters' }),
    responsibleParty: z
      .string()
      .min(1, { message: 'Responsible Party is required' })
      .max(256, { message: 'Maximum length is 256 characters' }),
    bindingParty: z.string().optional(),
    country: z
      .string()
      .min(1, { message: 'Country is required' })
      .max(256, { message: 'Maximum length is 256 characters' }),
    streetAddress1: z
      .string()
      .max(256, { message: 'Maximum length is 256 characters' }),
    streetAddress2: z
      .string()
      .max(256, { message: 'Maximum length is 256 characters' }),
    city: z.string().max(256, { message: 'Maximum length is 256 characters' }),
    state: z.string().max(256, { message: 'Maximum length is 256 characters' }),
    postalCode: z
      .string()
      .max(256, { message: 'Maximum length is 256 characters' }),
    privateContact: z
      .string().min(1, { message: 'Contact email address is required' })
      .email({ message: 'Please enter a valid email address' })
      .or(z.literal('')),
    publicContact: z
      .string()
      .email({ message: 'Please enter a valid email address' })
      .or(z.literal('')),
    projectName: z
      .string()
      .min(1, { message: 'Project name is required' })
      .max(256, { message: 'Maximum length is 256 characters' }),
    projectWebsite: z
      .string()
      .url({
        message:
          'Please enter a valid url including the protocol (e.g https://example.com)',
      })
      .or(z.literal('')),
    projectVersion: z
      .string()
      .max(256, { message: 'Maximum length is 256 characters' }),
    previousVersions: z.array(z.object()),
    primaryType: z.string().min(1, {
      message: `You must select a project type. If your project doesn't fall into any of these types, select "Other".`,
    }),
    additionalType: z.array(z.string()).or(z.literal('')),
    projectKeywords: z.string(),
    documentationUrl: z
      .string()
      .url({
        message:
          'Please enter a valid url including the protocol (e.g https://example.com)',
      })
      .or(z.literal('')),
    availableFileFormat: z.boolean(),
    citations: z.array(z.object()),
    hardwareLicense: z.string().min(1, {
      message: `Hardware license: You must select a license. If your license is not listed, select "Other"`,
    }),
    softwareLicense: z.string().min(1, {
      message: `Software license: You must select a license. If your license is not listed, select "Other". If your project doesn't use software, select "No software".`,
    }),
    documentationLicense: z.string().min(1, {
      message: `Documentation License: You must select a license. If your license is not listed, select "Other"`,
    }),
    noCommercialRestriction: z.string(),
    explanationNcr: z.string().optional().or(z.literal('')),
    noDocumentationRestriction: z.string(),
    explanationNdr: z.string().optional().or(z.literal('')),
    openHardwareComponents: z.string(),
    explanationOhwc: z.string().optional().or(z.literal('')),
    creatorContribution: z.string(),
    explanationCcr: z.string().optional().or(z.literal('')),
    noUseRestriction: z.string(),
    explanationNur: z.string().optional().or(z.literal('')),
    redistributedWork: z.string(),
    explanationRwr: z.string().optional().or(z.literal('')),
    noSpecificProduct: z.string(),
    explanationNsp: z.string().optional().or(z.literal('')),
    noComponentRestriction: z.string(),
    explanationNor: z.string().optional().or(z.literal('')),
    technologyNeutral: z.string(),
    explanationTn: z.string().optional().or(z.literal('')),
    certificationMarkTerms: z.array(z.string()).optional(),
    explanationCertificationTerms: z.string().optional(''),
    relationship: z.string(),
    agreementTerms: z.boolean().refine(val => val === true, {
      message: 'You must agree to the terms and conditions',
    }),
    parentName: z.string(),
    // 'g-recaptcha-response': z.string(),
  })
  .superRefine((values, context) => {
    if (
      values.responsiblePartyType !== 'Individual' &&
      values.bindingParty === ''
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'Name of the binding party is required if responsible party type is not an individual',
        path: ['bindingParty'],
      });
    }

    if (
      values.noCommercialRestriction === 'false' &&
      values.explanationNcr === ''
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'noCommercialRestriction: This explanation is required if you answered no.',
        path: ['explanationNcr'],
      });
    }

    if (
      values.noDocumentationRestriction === 'false' &&
      values.explanationNdr === ''
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'noDocumentationRestriction: This explanation is required if you answered no.',
        path: ['explanationNdr'],
      });
    }

    if (
      values.openHardwareComponents === 'false' &&
      values.explanationOhwc === ''
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'openHardwareComponents: This explanation is required if you answered no.',
        path: ['explanationOhwc'],
      });
    }

    if (
      values.creatorContribution === 'false' &&
      values.explanationCcr === ''
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'creatorContribution: This explanation is required if you answered no.',
        path: ['explanationCcr'],
      });
    }
    if (values.noUseRestriction === 'false' && values.explanationNur === '') {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'noUseRestriction: This explanation is required if you answered no.',
        path: ['explanationNur'],
      });
    }
    if (values.redistributedWork === 'false' && values.explanationRwr === '') {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'redistributedWork: This explanation is required if you answered no.',
        path: ['explanationRwr'],
      });
    }

    if (values.noSpecificProduct === 'false' && values.explanationNsp === '') {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'noSpecificProduct: This explanation is required if you answered no.',
        path: ['explanationNsp'],
      });
    }

    if (
      values.noComponentRestriction === 'false' &&
      values.explanationNor === ''
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'noComponentRestriction: This explanation is required if you answered no.',
        path: ['explanationNor'],
      });
    }

    if (values.technologyNeutral === 'false' && values.explanationTn === '') {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'technologyNeutral: This explanation is required if you answered no.',
        path: ['explanationTn'],
      });
    }

    if (
      values.certificationMarkTerms.length !== 5 &&
      values.explanationCertificationTerms === ''
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: `This explanation is required if you did not agree to one or more of the certification mark terms.`,
        path: ['explanationCertificationTerms'],
      });
    }
  });
