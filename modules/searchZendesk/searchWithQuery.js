const searchWithQuery = ({ field, value }, { indexes, collection }) => {
  const matchedField = indexes[field];

  if (!matchedField) {
    return [];
  }

  const matchedIndexes = matchedField[value] || [];
  return matchedIndexes.map((i) => collection[i]);
};

module.exports = searchWithQuery;
