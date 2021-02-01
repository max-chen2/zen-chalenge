const getSearchableFields = require('./getSearchableFields');

const getIndexesByField = (array, field) => array.reduce((acc, it, index) => {
  const key = it[field] === undefined ? '' : it[field];
  const value = acc[key] ? [...acc[key], index] : [index];
  return {
    ...acc,
    [key]: value,
  };
}, {});

const createIndexByFieldFunc = (collection) => (field) => getIndexesByField(collection, field);

const createSearchableCollection = (collection) => {
  const searchableFields = getSearchableFields(collection);
  // Curry func to not repeat collection when invoking func
  const collectionIndexByFieldFunction = createIndexByFieldFunc(collection);
  const searchableIndexes = searchableFields.reduce((acc, it) => ({
    ...acc,
    [it]: collectionIndexByFieldFunction(it),
  }), {});
  return {
    collection,
    indexes: searchableIndexes,
    searchableFields,
  };
};

module.exports = createSearchableCollection;
