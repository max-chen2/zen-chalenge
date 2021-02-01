const chalk = require('chalk');

const init = (searchableCollections) => {
  Object.keys(searchableCollections).forEach((key) => {
    console.log(chalk.blue(`Allowed search fields for ${key}`));
    searchableCollections[key].searchableFields.forEach((field) => {
      console.log(field);
    });
  });
};

module.exports = {
  init,
};
