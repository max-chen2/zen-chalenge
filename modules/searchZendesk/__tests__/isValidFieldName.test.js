const isValidFieldName = require('../isValidFieldName');

describe('isValidFieldName', () => {
  it('returns false for unmatched field name', () => {
    const actual = isValidFieldName('unmatched', ['name', 'address', 'email', 'country']);
    expect(actual).toEqual(false);
  });

  it.each([
    'name', 'address', 'email', 'country',
  ])('returns true for matched field name', (fieldName) => {
    const actual = isValidFieldName(fieldName, ['name', 'address', 'email', 'country']);
    expect(actual).toEqual(true);
  });
});
