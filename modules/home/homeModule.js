const prompts = require('prompts');
const chalk = require('chalk');
const searchZendeskModule = require('../searchZendesk/searchZendeskModule');
const listSearchableFieldsModule = require('../listSearchableFields/listSearchableFieldsModule');
const MENU_OPTIONS = require('./homeMenuOptions');

const { SEARCH_ZENDESK, VIEW_SEARCHABLE_FIELDS, QUIT } = MENU_OPTIONS;

const promptMenuOptions = async (searchableCollections) => {
  const mainMenuSelection = (await prompts({
    type: 'select',
    name: 'value',
    message: chalk.yellow('Select search options, you can return to top menu anytime by pressing Ctrl+C'),
    choices: Object.keys(MENU_OPTIONS).map(
      (k) => ({ title: MENU_OPTIONS[k], value: MENU_OPTIONS[k] }),
    ),
  })).value;

  switch (mainMenuSelection) {
    case SEARCH_ZENDESK:
      await searchZendeskModule.init(searchableCollections);
      break;
    case VIEW_SEARCHABLE_FIELDS:
      listSearchableFieldsModule.init(searchableCollections);
      break;
    case QUIT:
      process.exit();
      break;
    default:
      break;
  }
  await promptMenuOptions(searchableCollections);
};

const showWelcome = () => {
  console.log(chalk.bgBlue('Welcome to Zendesk Search'));
};

const init = async (searchableCollections) => {
  showWelcome();
  await promptMenuOptions(searchableCollections);
};

module.exports = {
  init,
};
