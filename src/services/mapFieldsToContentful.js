import {
  sectionOne,
  sectionTwo,
  sectionThree,
  sectionFour,
} from '../data/form_fields';

import {
  returnArrayFromCheckbox,
  returnArrayFromTextField,
  returnBooleanFromCheckbox,
  returnBooleanFromSelect,
  returnReferences,
  removeElFromArray,
} from '../helpers/formHelpers/formatter';

const citationsKeyRegex = /^citations\[\d+\]$/;

let allFields = [...sectionOne, ...sectionTwo, ...sectionThree, ...sectionFour];

const getFieldTypes = fieldType =>
  allFields
    .filter(field => field.fieldType === fieldType)
    .map(field => field.contentfulFieldName);

const isAddUrlField = key =>
  // citations come from dynamically generated  form fields with names 'citations[x]'
  citationsKeyRegex.test(key);

const isArrayField = key => getFieldTypes('string_array').indexOf(key) !== -1;
const isBoolean = key => getFieldTypes('boolean_checkbox').indexOf(key) !== -1;
const isBooleanSelect = key =>
  getFieldTypes('boolean_select').indexOf(key) !== -1;
const isCheckboxArray = key =>
  getFieldTypes('checkbox_array').indexOf(key) !== -1;
const isReferenceField = key => getFieldTypes('reference').indexOf(key) !== -1;

export default function mapFieldsToContentful(values) {
  let formValues = values;

  let keys = Object.keys(values);

  keys = removeElFromArray(keys, 'hiddenRecaptcha');
  keys = removeElFromArray(keys, 'g-recaptcha-response');

  const fields = {};
  let citations = [];

  keys.forEach(key => {
    let keyValue;
    if (isBoolean(key)) {
      keyValue = returnBooleanFromCheckbox(formValues[key]);
    } else if (isCheckboxArray(key)) {
      const checkedValues = returnArrayFromCheckbox(formValues[key]);
      console.log(checkedValues, 'checkedValues');
      if (checkedValues.length !== 0) {
        keyValue = checkedValues;
      } else {
        return [];
      }
    } else if (isBooleanSelect(key)) {
      keyValue = returnBooleanFromSelect(formValues[key]);
    } else if (isReferenceField(key)) {
      keyValue = returnReferences(formValues[key]);
      // keyValue = formValues[key].map(item => item.value );
    } else if (isArrayField(key)) {
      keyValue = returnArrayFromTextField(formValues[key]);
    } else {
      keyValue = formValues[key] || '';
    }
    if (!isAddUrlField(key)) {
      fields[key] = {
        'en-US': keyValue,
      };
    }
  });
  // add citations input values to contentful field name
  citations = formValues['citations'].filter(citation => {
    return citation.title !== '' && citation.url !== '';
  });

  fields.citations = { 'en-US': citations };
  delete fields['previousVersions[]'];
  delete fields['captcha'];
  fields.previousVersions = formValues['previousVersions'] && {
    'en-US': returnReferences(
      Array.from(formValues['previousVersions']).map(item => item.value),
    ),
  };
  return fields;
}
