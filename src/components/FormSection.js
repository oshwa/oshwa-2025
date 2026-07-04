import React from 'react';
import kebabCase from 'lodash.kebabcase';

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
import { de } from 'zod/v4/locales';

const FormSection = ({
  content,
  data,
  register,
  errors,
  control,
  append,
  remove,
  fields,
}) => {
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

  return (
    <>
      {content.map((question, idx) => {
        return (
          <>
            {question.subheading && (
              <h3 className="form-subheading">{question?.subheading}</h3>
            )}
            {question.children ? (
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
              question.layout && (
                <div
                  key={kebabCase(
                    `${question.contentfulFieldName} ${question.title}`,
                  )}
                  className={`form_question ${question.layout}`}
                >
                  {formatQuestion(question)}
                </div>
              )
            )}
          </>
        );
      })}
    </>
  );

  // return (
  //   <>
  //     {content.map((question, idx) => {
  //       {question?.subheading}
  //       return question.children ? (
  //         <div
  //           key={kebabCase(`section one ${idx}`)}
  //           className={
  //             question.children ? question.layout : 'grid grid-cols-3 gap-4'
  //           }
  //         >
  //           {question.children.map(child => (
  //             <div
  //               key={kebabCase(`${child.contentfulFieldName} ${child.title}`)}
  //               className={`form_question ${child.layout}`}
  //             >
  //               {formatQuestion(child)}
  //             </div>
  //           ))}
  //         </div>
  //       ) : (
  //         <div
  //           key={kebabCase(`${question.contentfulFieldName} ${question.title}`)}
  //           className={`form_question ${question.layout}`}
  //         >
  //           {formatQuestion(question)}
  //         </div>
  //       );
  //     })}
  //   </>
  // );
};

export default FormSection;
