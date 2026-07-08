import React from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import kebabCase from 'lodash.kebabcase';
import Select from 'react-select';

export const CreateLabel = ({ content }) => {
  const { contentfulFieldName, title, hidden } = content;
  return (
    <label
      className="label pb-4"
      htmlFor={contentfulFieldName}
      dangerouslySetInnerHTML={{ __html: title || '' }}
      style={{
        visibility: hidden ? `hidden` : `visible`,
        display: hidden ? `none` : `initial`,
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
          <p className="instructions">{renderInstructions(instructions)}</p>
        </div>
        {errors[contentfulFieldName] && (
          <p className="error-message w-full">
            {errors[contentfulFieldName]?.message}
          </p>
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
      <div>
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
        </div>

        <p
          className="instructions"
          dangerouslySetInnerHTML={{
            __html: renderInstructions(instructions),
          }}
        />

        {errors[contentfulFieldName] && (
          <p className="error-message w-full">
            {errors[contentfulFieldName]?.message}
          </p>
        )}
      </div>
    </>
  );
};

export const CreateCheckbox = ({ content, register, errors, validations }) => {
  const { instructions, contentfulFieldName, required } = content;

  return (
    <>
      <div className="checkbox-item flex items-start gap-4">
        <input
          className="mt-2"
          type="checkbox"
          id={contentfulFieldName}
          name={contentfulFieldName}
          {...register(contentfulFieldName, { required })}
        />
        <CreateLabel content={content} />
      </div>
      <p className="instructions">{renderInstructions(instructions)}</p>
      {errors[contentfulFieldName] && (
        <p className="error-message w-full">
          {errors[contentfulFieldName]?.message}
        </p>
      )}
    </>
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
      className="checkbox flex items-start"
    >
      <input
        className="mt-2"
        type="checkbox"
        id={option}
        name={contentfulFieldName}
        value={option}
        {...register(`${contentfulFieldName}[]`)}
      />
      <label className="checkbox-label" htmlFor={option}>
        {option}
      </label>
    </div>
  ));
  return (
    <>
      <CreateLabel content={content} />
      <fieldset>
        <legend className="instructions">
          {renderInstructions(instructions)}
        </legend>
        <div className="checkboxes-container py-4 grid lg:grid-cols-4 gap-4">
          {allCheckboxes}
        </div>
        {errors[contentfulFieldName] && (
          <p className="error-message w-full">
            {errors[contentfulFieldName]?.message}
          </p>
        )}
      </fieldset>
    </>
  );
};

export const renderInstructions = instructions =>
  `${instructions ? `${instructions}` : ``}`;

export const CreateTextArea = ({ content, register, errors }) => {
  const { instructions, contentfulFieldName, formPlaceholder } = content;

  return contentfulFieldName === 'explanationCertificationTerms' ? (
    <>
      <div className="form_question form-full-stacked">
        <CreateLabel content={content} />
        <textarea
          id={contentfulFieldName}
          type="text"
          name={contentfulFieldName}
          placeholder={formPlaceholder}
          {...register(contentfulFieldName)}
          style={{ width: '100%', height: '7rem' }}
        ></textarea>
      </div>
      <div className="textarea-message"></div>
      <p className="instructions">{renderInstructions(instructions)}</p>
      {errors[contentfulFieldName] && (
        <p className="error-message w-full">
          {errors[contentfulFieldName]?.message}
        </p>
      )}
    </>
  ) : (
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
      <p className="instructions">{renderInstructions(instructions)}</p>
      {errors[contentfulFieldName] && (
        <p className="error-message w-full">
          {errors[contentfulFieldName]?.message}
        </p>
      )}
    </>
  );
};

export const CreateCertificationMarkTerms = ({ content, register, errors }) => {
  const { instructions, contentfulFieldName, terms } = content;
  const certificationMarkTerms = terms;
  let allCheckboxes = certificationMarkTerms.map((option, idx) => {
    return (
      <div key={`certification-mark-terms-${idx}`} className="checkbox">
        <div className="checkbox-item my-2 flex items-start"></div>
        <input
          className="mt-2"
          type="checkbox"
          id={option.title}
          name={contentfulFieldName}
          value={option.title}
          {...register(contentfulFieldName)}
        />
        <label
          htmlFor={option.title}
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

        {allCheckboxes}
      </fieldset>
    </div>
  );
};

export const CreateCheckboxItem = ({ content, register, errors }) => {
  const { instructions, contentfulFieldName, terms } = content;
  const checkboxTerms = terms;
  let allCheckboxes = checkboxTerms.map((option, idx) => {
    return (
      <div key={`certification-mark-terms-${idx}`} className="checkbox ">
        <div className="checkbox-item my-2 flex items-start">
          <input
            className="mt-2"
            type="checkbox"
            id={option.title}
            name={contentfulFieldName}
            value={option.title}
            {...register(contentfulFieldName)}
          />
          <label
            className="checkbox-label"
            htmlFor={option.title}
            dangerouslySetInnerHTML={{ __html: option.term }}
          />
        </div>
      </div>
    );
  });

  return (
    <>
      <p className="label-bold">{content.title}</p>

      <CreateLabel content={content} hidden />
      <legend className="py-4">{instructions}</legend>
      <div className="">
        <fieldset>{allCheckboxes}</fieldset>
      </div>
    </>
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
      <p className="instructions">{renderInstructions(instructions)}</p>
      {errors[contentfulFieldName] && (
        <p className="error-message w-full">
          {errors[contentfulFieldName]?.message}
        </p>
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
            className="react-select-container"
            classNamePrefix="react-select"
            {...field}
            options={allOptions}
            isMulti
            placeholder={formPlaceholder}
          />
        )}
      ></Controller>
      <p className="instructions">{renderInstructions(instructions)}</p>
      {errors[contentfulFieldName] && (
        <p className="error-message w-full">
          {errors[contentfulFieldName]?.message}
        </p>
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
}) => {
  const { title, contentfulFieldName } = content;

  const { fields, append, remove } = useFieldArray({
    control,
    name: contentfulFieldName,
  });
  return (
    <>
      <div className="grid grid-cols-6 gap-4">
        <div className=" col-span-6 lg:col-span-2">
          <p>{title}</p>
        </div>
        <div className="col-span-6 lg:col-span-4">
          <div>
            {fields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className={`grid grid-cols-11 gap-4 pb-4 ${contentfulFieldName}-container`}
                >
                  <div className="col-span-1 lg:col-span-1 flex justify-end align-top">
                    <button
                      className=""
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <span className="material-icons material-symbols-outlined">
                        remove_circle
                      </span>
                    </button>
                  </div>
                  <div className="col-span-10 lg:col-span-5">
                    <label
                      htmlFor={`${contentfulFieldName}[${index}]--url_title`}
                    >
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
                  <div className="col-span-10 col-start-2 lg:col-span-5">
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
                      {...register(`${contentfulFieldName}.${index}.url`)}
                    ></input>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-11 gap-4 py-4">
            <div className="lg:col-span-1 flex justify-end align-top">
              <button
                type="button"
                onClick={() => append({ title: '', url: '' })}
              >
                <span className="material-icons material-symbols-outlined">
                  add_circle
                </span>
              </button>
            </div>
            <div className="col-span-10">Add another document</div>
          </div>
        </div>

        {errors[contentfulFieldName] && (
          <p className="error-message w-full">
            {errors[contentfulFieldName]?.message}
          </p>
        )}
      </div>
    </>
  );
};
