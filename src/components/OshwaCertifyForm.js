import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import Captcha from 'react-google-recaptcha';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../helpers/formSchema';
import formText from '../data/certify-form-text.json';

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

  const formatQuestion = question => {
    switch (question.fieldType) {
      case 'input':
        return (
          <CreateTextInput
            content={question}
            register={register}
            errors={errors}
          />
        );
      case 'string_array':
        return (
          <CreateTextInput
            content={question}
            register={register}
            errors={errors}
          />
        );
      case 'single_select':
        return (
          <CreateDropdownSelect
            content={question}
            register={register}
            errors={errors}
            validations={data.certifyValidations}
          />
        );
      case 'textarea':
        return (
          <CreateTextArea
            content={question}
            register={register}
            errors={errors}
          />
        );
      case 'checkbox_array':
        return (
          <CreateCheckboxes
            content={question}
            register={register}
            errors={errors}
            validations={data.certifyValidations}
          />
        );
      case 'boolean_checkbox':
        return (
          <CreateCheckbox
            content={question}
            register={register}
            errors={errors}
          />
        );
      case 'checkbox_object':
        return (
          <CreateCertificationMarkTerms
            content={question}
            register={register}
            errors={errors}
          />
        );
      case 'boolean_select':
        return (
          <CreateBooleanDropdown
            content={question}
            register={register}
            errors={errors}
          />
        );
      case 'reference':
        return (
          <CreateMultiSelect
            content={question}
            register={register}
            errors={errors}
            options={data.allProjects.edges[0].node.projects}
            control={control}
          />
        );
      case 'add_url':
        return (
          <CreateCitationFields
            fields={fields}
            append={append}
            remove={remove}
            content={question}
            register={register}
            errors={errors}
            control={control}
          />
        );
      default:
        return <></>;
    }
  };

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
        <div className="form-section-header">
          <div className=" flex justify-between">
            <h2 className="generic-heading-2 py-8">Basic Information</h2>
            <p className="form-heading py-8">Section 1 of 4</p>
          </div>
          <div
            className="py-4"
            dangerouslySetInnerHTML={{ __html: formText.p1_introduction }}
          />
        </div>
        <div className="flex flex-col justify-center">
          {sectionOne.map((question, idx) => {
            return question.children ? (
              <div
                key={kebabCase(`section one ${idx}`)}
                className={
                  question.children ? question.layout : 'grid grid-cols-3 gap-4'
                }
              >
                {question.children.map(child => (
                  <div
                    key={kebabCase(
                      `${child.contentfulFieldName} ${child.title}`,
                    )}
                    className={`form_question ${child.layout}`}
                  >
                    {formatQuestion(child)}
                  </div>
                ))}
              </div>
            ) : (
              <div
                key={kebabCase(
                  `${question.contentfulFieldName} ${question.title}`,
                )}
                className={`form_question ${question.layout}`}
              >
                {formatQuestion(question)}
              </div>
            );
          })}
        </div>
      </div>
      {/* section two */}
      <div className="form-section form-width">
        <div className="form-section-header">
          <div className=" flex justify-between">
            <h2 className="generic-heading-2 py-8">Project Information</h2>
            <p className="form-heading py-8">Section 2 of 4</p>
          </div>
          <div dangerouslySetInnerHTML={{ __html: formText.p2_introduction }} />
        </div>
        <div className="flex flex-col justify-center">
          {sectionTwo.map((question, idx) => {
            return question.children ? (
              <div
                key={kebabCase(`section-two-group-${idx}`)}
                className={
                  question.children ? question.layout : 'grid grid-cols-3 gap-4'
                }
              >
                {question.children.map(child => (
                  <div
                    key={kebabCase(
                      `${child.contentfulFieldName} ${child.title}`,
                    )}
                    className={`form_question ${child.layout}`}
                  >
                    {formatQuestion(child)}
                  </div>
                ))}
              </div>
            ) : (
              <div
                key={kebabCase(
                  `${question.contentfulFieldName} ${question.title}`,
                )}
                className={`form_question ${question.layout}`}
              >
                {formatQuestion(question)}
              </div>
            );
          })}
        </div>
      </div>
      {/* section three  */}
      <div className="form-section form-width">
        <div className="form-section-header">
          <div className=" flex justify-between">
            <h2 className="generic-heading-2 py-8">Licensing Information</h2>
            <p className="form-heading py-8">Section 3 of 4</p>
          </div>
          <div
            className="py-4"
            dangerouslySetInnerHTML={{ __html: formText.p3_introduction }}
          />
        </div>

        <div className="flex flex-col justify-center">
          {sectionThree.map((question, idx) => {
            return question.children ? (
              <div
                key={kebabCase(`section-three-group-${idx}`)}
                className={
                  question.children ? question.layout : 'grid grid-cols-3 gap-4'
                }
              >
                {question.children.map(child => (
                  <div
                    key={kebabCase(
                      `${child.contentfulFieldName} ${child.title}`,
                    )}
                    className={`form_question ${child.layout}`}
                  >
                    {formatQuestion(child)}
                  </div>
                ))}
              </div>
            ) : (
              <div
                key={kebabCase(
                  `${question.contentfulFieldName} ${question.title}`,
                )}
                className={`form_question ${question.layout}`}
              >
                {formatQuestion(question)}
              </div>
            );
          })}
        </div>
      </div>
      {/* section four  */}
      <div className="form-section form-width">
        <div className="form-section-header">
          <div className=" flex justify-between">
            <h2 className="generic-heading-2 py-8">Certification</h2>
            <p className="form-heading py-8">Section 4 of 4</p>
          </div>
          <div
            className="py-4"
            dangerouslySetInnerHTML={{ __html: formText.p4_introduction }}
          />
        </div>

        <div className="flex flex-col justify-center">
          {sectionFour.map((question, idx) => {
            return question.children ? (
              <div
                key={kebabCase(`section-four-group-${idx}`)}
                className={
                  question.children ? question.layout : 'grid grid-cols-3 gap-4'
                }
              >
                {question.children.map(child => (
                  <div
                    key={kebabCase(
                      `${child.contentfulFieldName} ${child.title}`,
                    )}
                    className={`form_question ${child.layout}`}
                  >
                    {formatQuestion(child)}
                  </div>
                ))}
              </div>
            ) : (
              <div
                key={kebabCase(
                  `${question.contentfulFieldName} ${question.title}`,
                )}
                className={`form_question ${question.layout}`}
              >
                {formatQuestion(question)}
              </div>
            );
          })}
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
