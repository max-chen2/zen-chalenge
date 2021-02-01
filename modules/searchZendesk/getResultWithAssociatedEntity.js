/* eslint-disable camelcase */
const getResultById = (searchableCollection, id) => {
  const matchedIndexes = searchableCollection.indexes._id[id];
  if (matchedIndexes && matchedIndexes.length) {
    return searchableCollection.collection[matchedIndexes[0]];
  }
  return {};
};

const getResultWithAssociatedEntity = (resultObject, searchableCollections) => {
  const { organization_id, assignee_id, submitter_id } = resultObject;
  const { organizations, users } = searchableCollections;
  let associatedObject = { ...resultObject };

  associatedObject = organization_id ? {
    ...associatedObject,
    organization_name: getResultById(organizations, organization_id).name,
  } : associatedObject;

  associatedObject = submitter_id ? {
    ...associatedObject,
    submitter_name: getResultById(users, submitter_id).name,
  } : associatedObject;

  associatedObject = assignee_id ? {
    ...associatedObject,
    assignee_name: getResultById(users, assignee_id).name,
  } : associatedObject;

  return associatedObject;
};

module.exports = getResultWithAssociatedEntity;
