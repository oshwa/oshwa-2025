import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import Captcha from 'react-google-recaptcha';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../helpers/formSchema';
import formText from '../data/certify-form-text';
import FormSectionHeader from './FormSectionHeader';
import FormSection from './FormSection';

import {
  sectionOne,
  sectionTwo,
  sectionThree,
  sectionFour,
} from '../data/form_fields';

import {
  CreateDropdownSelect,
  CreateTextInput,
  CreateCheckboxes,
  CreateCheckbox,
  CreateTextArea,
  CreateCertificationMarkTerms,
  CreateBooleanDropdown,
  CreateMultiSelect,
  CreateCitationFields,
} from './FormComponents';

import kebabCase from 'lodash.kebabcase';

import mapFieldsToContentful from '../services/mapFieldsToContentful';

export const OshwaCertifyForm = () => {
  const captchaRef = useRef(null);

  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const data = useStaticQuery(graphql`
    query CertifyQuery {
      certifyValidations {
        softwareLicense
        responsiblePartyType
        primaryType
        country
        documentationLicense
        hardwareLicense
        additionalType
      }
      allProjects {
        edges {
          node {
            projects {
              id
              oshwaUid
              responsibleParty
              projectName
            }
          }
        }
      }
    }
  `);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      certificationMarkTerms: [],
      previousVersions: [],
      additionalType: '',
      citations: [{ title: '', url: '' }],
    },
  });

  const projectName = watch('projectName');

  const captchaEnabled = Boolean(projectName);

  const handleFormSubmit = async values => {
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const captcha = await captchaRef.current?.executeAsync();
      const fields = await mapFieldsToContentful(values);
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, captcha }),
      });

      if (response.ok) {
        navigate('/confirmation');
        return;
      }

      const result = await response.json().catch(() => ({}));
      setSubmitError(
        result.message ||
          'Something went wrong submitting the form. Please try again.',
      );
      captchaRef.current?.reset();
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(
        'Something went wrong submitting the form. Please try again.',
      );
      captchaRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'citations',
  });

  useEffect(() => {
    const subscription = watch((_value, { name }) => {
      if (name === 'responsiblePartyType') {
        void trigger(['bindingParty']);
      }
      if (name === 'noCommercialRestriction') {
        void trigger(['explanationNcr']);
      }
      if (name === 'noDocumentationRestriction') {
        void trigger(['explanationNdr']);
      }
      if (name === 'openHardwareComponents') {
        void trigger(['explanationOhwc']);
      }
      if (name === 'creatorContribution') {
        void trigger(['explanationCcr']);
      }
      if (name === 'noUseRestriction') {
        void trigger(['explanationNur']);
      }
      if (name === 'redistributedWork') {
        void trigger(['explanationRwr']);
      }
      if (name === 'noSpecificProduct') {
        void trigger(['explanationNsp']);
      }
      if (name === 'noComponentRestriction') {
        void trigger(['explanationNor']);
      }
      if (name === 'technologyNeutral') {
        void trigger(['explanationTn']);
      }
      if (name === 'certificationMarkTerms') {
        void trigger([`explanationCertificationTerms`]);
      }
    });

    // Cleanup the subscription on unmount.
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  return (
    <form className="certify" onSubmit={handleSubmit(handleFormSubmit)}>
      {/* section one  */}
      <div className="form-section form-width">
        <FormSectionHeader content={formText.sectionOne} />
        <div className="flex flex-col justify-center">
          <FormSection
            content={sectionOne}
            data={data}
            register={register}
            errors={errors}
          />
        </div>
      </div>
      {/* section two */}
      <div className="form-section form-width">
        <FormSectionHeader content={formText.sectionTwo} />
        <div className="flex flex-col justify-center">
          <FormSection
            content={sectionTwo}
            data={data}
            register={register}
            errors={errors}
            control={control}
            append={append}
            remove={remove}
            fields={fields}
          />
        </div>
      </div>
      {/* section three  */}
      <div className="form-section form-width">
        <FormSectionHeader content={formText.sectionThree} />
        <div className="flex flex-col justify-center">
          <FormSection
            content={sectionThree}
            data={data}
            register={register}
            errors={errors}
          />
        </div>
      </div>
      {/* section four  */}
      <div className="form-section form-width">
        <FormSectionHeader content={formText.sectionFour} />
        <div className="flex flex-col justify-center">
          <FormSection
            content={sectionFour}
            data={data}
            register={register}
            errors={errors}
          />
        </div>
      </div>

      {captchaEnabled && (
        <Captcha
          ref={captchaRef}
          size="invisible"
          sitekey={process.env.GATSBY_SITE_RECAPTCHA_KEY}
        />
      )}

      {submitError && (
        <div className="error-message w-full py-4 px-8">
          <p>{submitError}</p>
        </div>
      )}

      <div className="flex justify-end px-8 pb-5">
        <div className=" w-1/4">
          <div className="link link--notched notched notched--border">
            <input
              className="form-submit w-1/4"
              type="submit"
              value={isSubmitting ? 'Submitting…' : 'Submit'}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>
    </form>
  );
};
