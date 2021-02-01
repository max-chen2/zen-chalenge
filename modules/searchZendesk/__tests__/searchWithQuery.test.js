const searchWithQuery = require('../searchWithQuery');

describe('searchWithQuery', () => {
  const stubSearchableCollection = {
    indexes: {
      firstName: {
        max: [0, 2],
        lena: [1],
      },
      suburb: {
        melbourne: [0, 1],
        oakleigh: [2],
      },
    },
    collection: [
      {
        firstName: 'max',
        suburb: 'melbourne',
      },
      {
        firstName: 'lena',
        suburb: 'melbourne',
      },
      {
        firstName: 'max',
        suburb: 'oakleigh',
      },
    ],
  };

  it.each([
    [
      { field: 'firstName', value: 'max' },
      [
        {
          firstName: 'max',
          suburb: 'melbourne',
        },
        {
          firstName: 'max',
          suburb: 'oakleigh',
        },
      ],
    ],
    [
      { field: 'suburb', value: 'melbourne' },
      [
        {
          firstName: 'max',
          suburb: 'melbourne',
        },
        {
          firstName: 'lena',
          suburb: 'melbourne',
        },
      ],
    ],
  ])(
    'returns matching elements', ({ field, value }, expectedResult) => {
      const actual = searchWithQuery({ field, value }, stubSearchableCollection);
      expect(actual).toEqual(expectedResult);
    },
  );

  it('returns empty array when no match found', () => {
    const actual = searchWithQuery({ field: 'firstName', value: 'unmatched' }, stubSearchableCollection);
    expect(actual).toHaveLength(0);
  });

  it('returns empty array when invalid field', () => {
    const actual = searchWithQuery({ field: 'invalid field', value: 'unmatched' }, stubSearchableCollection);
    expect(actual).toHaveLength(0);
  });
});
