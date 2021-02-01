const getSearchableFields = require('../getSearchableFields.js');

describe('getSearchableFields', () => {
  it('returns fields for given array of objects', () => {
    const collection = [
      {
        a: 'a',
        d: 4,
      },
      {
        b: 'b',
      },
      {
        c: [1, 2, 3],
      },
    ];
    const fields = getSearchableFields(collection);
    expect(fields).toEqual(['a', 'b', 'c', 'd']);
  });

  it('removes duplicate entries', () => {
    const collection = [
      { a: 'a' },
      { a: 'a' },
      { a: 'a' },
      { b: 'b' },
      { c: [1, 2, 3] },
    ];
    const fields = getSearchableFields(collection);
    expect(fields).toEqual(['a', 'b', 'c']);
  });

  it('returns empty when called with empty', () => {
    const collection = [];
    const fields = getSearchableFields(collection);
    expect(fields).toEqual([]);
  });
});
