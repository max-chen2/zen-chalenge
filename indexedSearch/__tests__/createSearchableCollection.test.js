const getSearchableFields = require('../getSearchableFields');
const createSearchableCollection = require('../createSearchableCollection');

jest.mock('../getSearchableFields');

const stubSearchableFields = ['name', 'teamId', 'currentScore', 'online'];
getSearchableFields.mockImplementation(() => stubSearchableFields);

describe('createSearchableCollection', () => {
  const stubCollection = [
    { name: 'adam', teamId: 2 },
    { name: 'max', teamId: 3 },
    { name: 'lena', teamId: 3 },
    { currentScore: 500, online: false },
  ];

  const { searchableFields, indexes, collection } = createSearchableCollection(stubCollection);

  it('uses seachable fields returned by getSearchableFields', () => {
    expect(getSearchableFields).toHaveBeenCalled();
    expect(searchableFields).toEqual(stubSearchableFields);
  });

  it('returns collection', () => {
    expect(collection).toEqual(stubCollection);
  });

  it('returns indexes and use blank string if field is undefined', () => {
    const expectedIndexes = {
      name: {
        adam: [0],
        max: [1],
        lena: [2],
        '': [3],
      },
      teamId: {
        2: [0],
        3: [1, 2],
        '': [3],
      },
      currentScore: {
        500: [3],
        '': [0, 1, 2],
      },
      online: {
        '': [0, 1, 2],
        false: [3],
      },
    };

    expect(indexes).toEqual(expectedIndexes);
  });
});
