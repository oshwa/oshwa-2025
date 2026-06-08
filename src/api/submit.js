import submitFormToContentful from '../services/contentful';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const verifyEndpoint = 'https://www.google.com/recaptcha/api/siteverify';

  const captchaResponse = await fetch(verifyEndpoint, {
    method: 'POST',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: req.body.captcha,
    }),
  }).then(res => res.json());
  
  if (!captchaResponse.success) {
    return res.status(500).json({ status: 'error', error: captchaResponse });
  }
  const formBody = Object.assign({ ...req.body });
  delete formBody.captcha;
  const fields = { fields: formBody };

  try {
    const response = await submitFormToContentful(fields);

    // contentful management api does not return success status so check createdBy

    if (response.sys.createdBy) {
      return res.status(200).json({ success: true, response });
    } else {
      return res.status(422).json({ success: false, response });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
