import React from 'react';
import { Controller } from 'react-hook-form';
import kebabCase from 'lodash.kebabcase';
import Select from 'react-select';

export const CreateLabel = ({ content }) => {
  const { contentfulFieldName, title, hidden } = content;
  return (
    <label
      className="label py-2"
      htmlFor={contentfulFieldName}
      dangerouslySetInnerHTML={{ __html: title || '' }}
      style={{
        visibility: hidden ? `hidden` : `visible`,
      }}
    />
  );
};

export const CreateTextInput = ({ content, register, errors }) => {
  const { instructions, contentfulFieldName, formPlaceholder } = content;

  return (
    <>
      <CreateLabel content={content} />
      <div>
        <div className="">
          <input
            type="text"
            {...register(contentfulFieldName)}
            placeholder={formPlaceholder}
          />
          <p className="py-2">{instructions}</p>
        </div>
        {errors[contentfulFieldName] && (
          <div className="error-message w-full py-4">
            <p>{errors[contentfulFieldName]?.message}</p>
          </div>
        )}
      </div>
    </>
  );
};

export const CreateDropdownSelect = ({
  content,
  register,
  errors,
  validations,
}) => {
  const { instructions, contentfulFieldName, formPlaceholder, options } =
    content;

  const validationOptions = validations[options] || ['one', 'two', 'three'];

  return (
    <>
      <CreateLabel content={content} />
      <div className="select">
        <select
          id={contentfulFieldName}
          {...register(contentfulFieldName)}
          defaultValue={''}
        >
          <option
            key={kebabCase(`${contentfulFieldName} default`)}
            value=""
            disabled
          >
            {formPlaceholder}
          </option>

          {validationOptions.map(option => (
            <option
              key={kebabCase(`${contentfulFieldName} ${option}`)}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
        {errors[contentfulFieldName] && (
          <div className="error-message w-full py-4">
            <p>{errors[contentfulFieldName]?.message}</p>
          </div>
        )}

        <div
          className="instructions"
          dangerouslySetInnerHTML={{ __html: renderInstructions(instructions) }}
        />
      </div>
    </>
  );
};

export const CreateCheckbox = ({ content, register, errors, validations }) => {
  const { instructions, contentfulFieldName, required } = content;

  return (
    <div className="checkbox">
      <input
        type="checkbox"
        id={contentfulFieldName}
        name={contentfulFieldName}
        {...register(contentfulFieldName, { required })}
      />

      <CreateLabel content={content} />
      <div className="instructions">{renderInstructions(instructions)}</div>
      {errors[contentfulFieldName] && (
        <div className="error-message w-full py-4">
          <p>{errors[contentfulFieldName]?.message}</p>
        </div>
      )}
    </div>
  );
};

export const CreateCheckboxes = ({
  content,
  register,
  errors,
  validations,
}) => {
  const { instructions, contentfulFieldName, options } = content;

  const validationOptions = validations[options] || [];

  let allCheckboxes = validationOptions.map((option, idx) => (
    <div
      key={`${contentfulFieldName}-${idx}`}
      className="columns large-3 medium-4 small-12 checkbox"
    >
      <input
        type="checkbox"
        id={option}
        name={contentfulFieldName}
        value={option}
        {...register(`${contentfulFieldName}[]`)}
      />
      <label htmlFor={option}>{option}</label>
    </div>
  ));
  return (
    <>
      <CreateLabel content={content} />
      <fieldset>
        <legend className="instructions">
          {renderInstructions(instructions)}
        </legend>
        <div className="row">{allCheckboxes}</div>
        {errors[contentfulFieldName] && (
          <span className="error-message">
            {errors[contentfulFieldName]?.message}
          </span>
        )}
      </fieldset>
    </>
  );
};

export const renderInstructions = instructions =>
  `${instructions ? `${instructions}` : ``}`;

export const CreateTextArea = ({ content, register, errors }) => {
  const { instructions, contentfulFieldName, formPlaceholder } = content;

  return (
    <>
      <CreateLabel content={content} />
      <textarea
        id={contentfulFieldName}
        type="text"
        name={contentfulFieldName}
        placeholder={formPlaceholder}
        {...register(contentfulFieldName)}
        style={{ width: '100%', height: '7rem' }}
      ></textarea>
      <div className="textarea-message"></div>
      <div className="instructions">{renderInstructions(instructions)}</div>
      {errors[contentfulFieldName] && (
        <span className="error-message">
          {errors[contentfulFieldName]?.message}
        </span>
      )}
    </>
  );
};

export const CreateCertificationMarkTerms = ({ content, register, errors }) => {
  const { instructions, contentfulFieldName, terms } = content;
  const certificationMarkTerms = terms;
  let allCheckboxes = certificationMarkTerms.map((option, idx) => {
    return (
      <div
        key={`certification-mark-terms-${idx}`}
        className="columns small-12 checkbox"
      >
        <input
          type="checkbox"
          id={option.title}
          name={contentfulFieldName}
          value={option.title}
          {...register(contentfulFieldName)}
        />
        <label
          htmlFor={option}
          dangerouslySetInnerHTML={{ __html: option.term }}
        />
      </div>
    );
  });

  return (
    <div className="row">
      <CreateLabel content={content} hidden />
      <fieldset>
        <legend>{instructions}</legend>

        <div className="instructions"></div>
        {allCheckboxes}
      </fieldset>
    </div>
  );
};

export const CreateBooleanDropdown = ({ content, register, errors }) => {
  const { instructions, contentfulFieldName, required } = content;

  return (
    <>
      <CreateLabel content={content} />
      <div className="select">
        <select
          id={contentfulFieldName}
          type="text"
          name={contentfulFieldName}
          data-target={contentfulFieldName}
          defaultValue={true}
          {...register(contentfulFieldName, { required })}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div className="instructions">{renderInstructions(instructions)}</div>
      {errors[contentfulFieldName] && (
        <span className="error-message">
          {errors[contentfulFieldName]?.message}
        </span>
      )}
    </>
  );
};

export const CreateMultiSelect = ({
  content,
  register,
  errors,
  options,
  control,
}) => {
  const {
    instructions,
    contentfulFieldName,
    formPlaceholder,
    required,
    requiredErrorMessage,
  } = content;
  let allOptions =
    options.map(option => ({
      value: option.id,
      label: `${option.oshwaUid}: ${option.responsibleParty} - ${option.projectName}`,
    })) || [];

  return (
    <>
      <CreateLabel content={content} />
      <Controller
        name={contentfulFieldName}
        control={control}
        rules={required ? { required: requiredErrorMessage } : {}}
        render={({ field }) => (
          <Select
            {...field}
            options={allOptions}
            isMulti
            placeholder={formPlaceholder}
          />
        )}
      ></Controller>
      <div className="instructions">{renderInstructions(instructions)}</div>
      {errors[contentfulFieldName] && (
        <span className="error-message">
          {errors[contentfulFieldName]?.message}
        </span>
      )}
    </>
  );
};

export const CreateCitationFields = ({
  content,
  register,
  errors,
  options,
  control,
  fields,
  append,
  remove,
}) => {
  const { title, contentfulFieldName } = content;

  return (
    <>
      <p>{title}</p>

      {fields.map((field, index) => {
        return (
          <div key={field.id} className={`${contentfulFieldName}-container`}>
            <div>
              <label htmlFor={`${contentfulFieldName}[${index}]--url_title`}>
                Citation Title
              </label>
              <input
                id={`${contentfulFieldName}[${index}]--url_title`}
                type="text"
                className="url_create url_title"
                placeholder="Enter citation title"
                {...register(`${contentfulFieldName}.${index}.title`)}
              ></input>
            </div>
            <div>
              <div>
                <label
                  htmlFor={`${contentfulFieldName}[${index}]--url_address`}
                >
                  Citation URL
                </label>
                <input
                  id={`${contentfulFieldName}[${index}]--url_address`}
                  type="text"
                  className="url_create url_address"
                  placeholder="Enter citation url"
                  {...register(`${contentfulFieldName}[${index}].url`)}
                ></input>
              </div>
            </div>
            <button type="button" onClick={() => remove(index)}>
              Delete
            </button>
          </div>
        );
      })}

      <button type="button" onClick={() => append({ title: '', url: '' })}>
        append
      </button>
      {errors[contentfulFieldName] && (
        <span className="error-message">
          {errors[contentfulFieldName]?.message}
        </span>
      )}
    </>
  );
};
