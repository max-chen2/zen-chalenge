/* eslint-disable camelcase */
const getResultWithAssociatedEntity = require('../getResultWithAssociatedEntity');

const stubSearchableCollections = {
  users: {
    indexes: {
      _id: {
        1: [0],
        2: [1],
      },
    },
    collection: [
      { name: 'max' },
      { name: 'lena' },
    ],
  },
  organizations: {
    indexes: {
      _id: {
        10041: [0],
      },
    },
    collection: [
      { name: 'AAA production pty ltd' },
    ],
  },
};

describe('getResultWithAssociatedEntity', () => {
  it('returns all associated entities', () => {
    const stubEntity = {
      _id: '5',
      organization_id: 10041,
      submitter_id: 1,
      assignee_id: 2,
    };

    const actual = getResultWithAssociatedEntity(stubEntity, stubSearchableCollections);
    console.log('actual', actual);
    const { organization_name, submitter_name, assignee_name } = actual;
    expect(organization_name).toEqual('AAA production pty ltd');
    expect(submitter_name).toEqual('max');
    expect(assignee_name).toEqual('lena');
  });

  it('returns undefined for unmatched ids', () => {
    const stubEntity = {
      _id: '5',
      organization_id: 9999,
      submitter_id: 1,
      assignee_id: 2,
    };

    const actual = getResultWithAssociatedEntity(stubEntity, stubSearchableCollections);
    console.log('actual', actual);
    const { organization_name } = actual;
    expect(organization_name).toEqual(undefined);
  });

  it('returns undefined when not provided id', () => {
    const stubEntity = {
      _id: '5',
    };

    const actual = getResultWithAssociatedEntity(stubEntity, stubSearchableCollections);
    console.log('actual', actual);
    const { organization_name, submitter_name, assignee_name } = actual;
    expect(organization_name).toEqual(undefined);
    expect(submitter_name).toEqual(undefined);
    expect(assignee_name).toEqual(undefined);
  });
});
