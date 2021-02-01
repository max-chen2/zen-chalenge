const chalk = require('chalk');
const listSearchableFields = require('../listSearchableFieldsModule');

const consoleLog = jest.fn();
console.log = consoleLog;

describe('listSearchableFields', () => {
  describe('init', () => {
    it('outputs result to console for each searchable type', () => {
      const stubSearchables = {
        schools: {
          searchableFields: ['a'],
        },
        countries: {
          searchableFields: ['continent', 'language'],
        },
      };
      listSearchableFields.init(stubSearchables);
      expect(consoleLog).toBeCalledWith(chalk.blue('Allowed search fields for schools'));
      expect(consoleLog).toBeCalledWith(chalk.blue('Allowed search fields for countries'));
    });

    it('outputs field name for each searchable field', () => {
      const stubSearchables = {
        countries: {
          searchableFields: ['continent', 'language'],
        },
      };
      listSearchableFields.init(stubSearchables);
      expect(consoleLog).toBeCalledWith('continent');
      expect(consoleLog).toBeCalledWith('language');
    });
  });
});
