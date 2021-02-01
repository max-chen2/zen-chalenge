const isValidFieldName = (
  fieldName, searchableFieldNames,
) => searchableFieldNames.includes(fieldName);

module.exports = isValidFieldName;
