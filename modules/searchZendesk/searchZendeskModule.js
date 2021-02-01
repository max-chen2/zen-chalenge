const prompts = require('prompts');
const chalk = require('chalk');
const isValidFieldName = require('./isValidFieldName');
const searchWithQuery = require('./searchWithQuery');
const printResults = require('./printResults');
const getResultWithAssociatedEntity = require('./getResultWithAssociatedEntity');

const promptSearchField = async ({ selectedCollection, searchableCollections }) => {
  const { searchableFields } = selectedCollection;
  const searchFieldName = (await prompts({
    type: 'text',
    name: 'value',
    message: chalk.yellow('Please enter search field, valid fields are: \n') + chalk.blue(selectedCollection.searchableFields),
    validate: (value) => isValidFieldName(value, searchableFields),
  })).value;

  if (!searchFieldName) {
    return;
  }

  const searchValue = (await prompts({
    type: 'text',
    name: 'value',
    message: chalk.yellow('Please enter search value'),
  })).value;

  console.time('query time');
  console.log(chalk.yellow(`Searching with field: ${searchFieldName}, value: ${searchValue}`));
  const results = searchWithQuery(
    { field: searchFieldName, value: searchValue },
    selectedCollection,
  );
  const resultsWithAssociatedEntity = results.map(
    (r) => getResultWithAssociatedEntity(r, searchableCollections),
  );
  printResults(resultsWithAssociatedEntity);
  console.timeEnd('query time');
};

const init = async (searchableCollections) => {
  const searchEntityTypeSelection = (await prompts({
    type: 'select',
    name: 'value',
    message: chalk.yellow('Please select type to search'),
    choices: Object.keys(searchableCollections)
      .map((k) => ({ title: k, value: k })),
  })).value;
  if (searchEntityTypeSelection) {
    const selectedCollection = searchableCollections[searchEntityTypeSelection];
    await promptSearchField({
      selectedCollection,
      searchableCollections,
    });
  }
};

module.exports = {
  init,
};
