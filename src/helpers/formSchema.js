import * as z from 'zod';
const certificationMarkTermsCount = 5;
const licensingChecklistCount = 9;

const maxLongTextMessage = 'Must not exceed 50000 characters';
const maxShortTextMessage = 'Maximum length is 256 characters';
const validUrlMessage =
  'Please enter a valid url including the protocol (e.g https://example.com)';
const validEmailMessage = 'Please enter a valid email address';
// Define the validation rules across fields
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
      .string()
      .min(1, { message: 'Contact email address is required' })
      .email({ message: 'Please enter a valid email address' }),
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
    previousVersions: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    ),
    projectDescription: z
      .string()
      .max(50000, { message: 'Must not exceed 50000 characters' }),
    intendedUseCase: z.string().max(50000, { message: maxLongTextMessage }),
    intendedUseCaseStatement: z.boolean(),
    primaryType: z.string().min(1, {
      message: `You must select a project type. If your project doesn't fall into any of these types, select "Other".`,
    }),
    additionalType: z.array(z.string()).or(z.literal('')),
    projectKeywords: z.string(),
    citations: z.array(
      z.object({
        title: z.string(),
        url: z.string(),
      }),
    ),
    documentationUrl: z
      .string()
      .url({
        message:
          'Please enter a valid url including the protocol (e.g https://example.com)',
      })
      .or(z.literal('')),
    availableFileFormat: z.boolean(),
    hardwareLicense: z.string().min(1, {
      message: `Hardware license: You must select a license. If your license is not listed, select "Other"`,
    }),
    softwareLicense: z.string().min(1, {
      message: `Software license: You must select a license. If your license is not listed, select "Other". If your project doesn't use software, select "No software".`,
    }),
    documentationLicense: z.string().min(1, {
      message: `Documentation License: You must select a license. If your license is not listed, select "Other"`,
    }),
    licensingChecklist: z.array(z.string()).optional(),
    licensingChecklistExplanation: z.string().optional(),
    certificationMarkTerms: z.array(z.string()).optional(),
    explanationCertificationTerms: z.string().optional(),
    agreementTerms: z.boolean().refine(val => val === true, {
      message: 'You must agree to the terms and conditions',
    }),
    relationship: z.string(),
    parentName: z.string(),
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
      values.certificationMarkTerms.length !== certificationMarkTermsCount &&
      values.explanationCertificationTerms === ''
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: `This explanation is required if you did not agree to one or more of the certification mark terms.`,
        path: ['explanationCertificationTerms'],
      });
    }

    if (
      values.licensingChecklist.length !== licensingChecklistCount &&
      values.licensingChecklistExplanation === ''
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: `This explanation is required if you left any item unchecked. Please limit your response to 500 characters`,
        path: ['licensingChecklistExplanation'],
      });
    }
  });
