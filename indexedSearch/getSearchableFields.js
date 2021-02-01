const getSearchableFields = (sourceCollection) => Array.from(sourceCollection.reduce(
  (propertiesSet, newItem) => {
    const newItemProperties = Object.keys(newItem);
    const propArray = [...newItemProperties, ...Array.from(propertiesSet)];
    return new Set(propArray);
  }, new Set([]),
)).sort();

module.exports = getSearchableFields;
