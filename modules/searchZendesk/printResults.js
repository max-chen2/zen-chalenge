const chalk = require('chalk');

const printObject = (object) => {
  console.log(
    Object.keys(object).reduce(
      (acc, it) => `${acc + chalk.blue(it)}: ${chalk.green(object[it])}\n`, '',
    ),
  );
};

const printResults = (results) => {
  results.forEach((r) => printObject(r));
  console.log(chalk.bgGreen(chalk.black(`${results.length} results`)));
};

module.exports = printResults;
