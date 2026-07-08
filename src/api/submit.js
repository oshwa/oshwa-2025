import * as z from 'zod';
import submitFormToContentful from '../services/contentful';

const RECAPTCHA_VERIFY_ENDPOINT =
  'https://www.google.com/recaptcha/api/siteverify';

const MAX_TEXT_LENGTH = 256;

const localized = valueSchema =>
  z.object({ 'en-US': valueSchema }, { message: 'Missing or malformed field' });

const requiredText = label =>
  localized(
    z
      .string({ message: `${label} is required` })
      .trim()
      .min(1, { message: `${label} is required` })
      .max(MAX_TEXT_LENGTH, {
        message: `${label} must be at most ${MAX_TEXT_LENGTH} characters`,
      }),
  );

const requiredEmail = label =>
  localized(
    z
      .string()
      .min(1, { message: `${label} is required` })
      .email({ message: `${label} must be a valid email address` }),
  );

const optionalEmail = label =>
  localized(
    z
      .string()
      .email({ message: `${label} must be a valid email address` })
      .or(z.literal('')),
  );

const submissionSchema = z.looseObject({
  responsiblePartyType: requiredText('Responsible party type'),
  responsibleParty: requiredText('Responsible party'),
  country: requiredText('Country'),
  projectName: requiredText('Project name'),
  primaryType: requiredText('Primary type'),
  hardwareLicense: requiredText('Hardware license'),
  softwareLicense: requiredText('Software license'),
  documentationLicense: requiredText('Documentation license'),
  privateContact: requiredEmail('Contact email address'),
  publicContact: optionalEmail('Public contact email address'),
  agreementTerms: localized(
    z.literal(true, {
      message: 'You must agree to the terms and conditions',
    }),
  ),
});

async function verifyCaptcha(token) {
  const response = await fetch(RECAPTCHA_VERIFY_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: token,
    }),
  });
  return response.json();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { captcha, ...formBody } = req.body || {};

  if (!captcha) {
    return res.status(400).json({ message: 'Captcha token is missing' });
  }

  // 1. Verify reCAPTCHA token
  let captchaResult;
  try {
    captchaResult = await verifyCaptcha(captcha);
  } catch (error) {
    console.error('reCAPTCHA verification request failed:', error);
    return res
      .status(502)
      .json({ message: 'Could not verify captcha, please try again' });
  }

  if (!captchaResult.success) {
    console.warn(
      'reCAPTCHA verification rejected:',
      captchaResult['error-codes'],
    );
    return res.status(403).json({ message: 'Captcha verification failed' });
  }

  // 2. Server side validations
  const parsed = submissionSchema.safeParse(formBody);

  if (!parsed.success) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: z.flattenError(parsed.error).fieldErrors,
    });
  }

  // 3. Send to contentful

  try {
    const entry = await submitFormToContentful({ fields: parsed.data });

    if (entry?.sys?.id) {
      return res.status(200).json({ success: true, id: entry.sys.id });
    }
    console.error('Unexpected Contentful response:', entry);
    return res
      .status(502)
      .json({ message: 'Submission could not be completed' });
  } catch (error) {
    console.error('Error creating Contentful entry:', error);
    return res
      .status(500)
      .json({ message: 'Something went wrong submitting the form' });
  }
}
