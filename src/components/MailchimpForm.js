import React, { useState } from 'react';

const MailchimpForm = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [interest, setInterest] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const listFields = {
      FNAME: firstName,
      LNAME: lastName,
      INTEREST: interest,
    };

    try {
      const response = await fetch(
        'https://oshwa.us19.list-manage.com/subscribe/post?u=3e1619d377d5a6c361ef3292b&id=ca147d8610',
        {
          method: 'POST',
          mode: 'no-cors', // bypass CORS
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            email: email,
            ...listFields,
          }),
        }
      );

      console.log('response', response);
      setStatus(<div className='form-message'><p>Thank you for subscribing!</p></div>);
    } catch (error) {
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label htmlFor="signup-input" className="signup-label">Newsletter</label>

      <fieldset className="signup-submit-wrapper notched notched--border my-4">
        <input
          type="email"
          placeholder="Email address *"
          className="signup-input"
          id="signup-input"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </fieldset>

      <fieldset className="signup-submit-wrapper notched notched--border my-4">
        <input
          type="text"
          placeholder="First name"
          className="signup-input"
          id="first-name-input"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </fieldset>

      <fieldset className="signup-submit-wrapper notched notched--border my-4">
        <input
          type="text"
          placeholder="Last name"
          className="signup-input"
          id="last-name-input"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </fieldset>

      <fieldset className="signup-submit-wrapper notched notched--border my-4">
        <textarea
          placeholder="Why are you interested in open-source hardware?"
          className="signup-input"
          id="interest-input"
          name="interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        />
      </fieldset>

      <fieldset className="signup-submit-wrapper submit-btn notched notched--border w-1/2">
        <input
          type="submit"
          value="Subscribe"
          className="signup-submit"
        />
      </fieldset>

      {status && <p>{status}</p>}
    </form>
  );
};

export default MailchimpForm;
