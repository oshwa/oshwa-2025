export const returnArrayFromCheckbox = values => {
  if (typeof values === 'string') {
    return values.length > 0 ? values.split(', ') : [];
  }
  return values || [];
};

export const returnArrayFromTextField = str => {
  if (!str) {
    return [];
  }
  return str.split(',').map(item => decodeURI(item.trim()));
};

export const returnBooleanFromCheckbox = value => !!value;

export const returnBooleanFromSelect = values => {
  if (values === 'false') {
    return false;
  }
  return true;
};

export const returnReferences = referenceIDs => {
  const references = [];
  if (!referenceIDs) {
    return [];
  }
  if (typeof referenceIDs === 'string') {
    references.push({
      sys: { type: 'Link', linkType: 'Entry', id: referenceIDs },
    });
  } else {
    referenceIDs.forEach(id => {
      references.push({ sys: { type: 'Link', linkType: 'Entry', id } });
    });
  }
  return references;
};

export const removeElFromArray = (array, element) => {
  const index = array.indexOf(element);
  if (index !== -1) {
    array.splice(index, 1);
  }
  return array;
};
