const chalk = require('chalk');
const printResults = require('../printResults');

const mockConsoleLog = jest.fn();
console.log = mockConsoleLog;

describe('printResults', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls console log with result count', () => {
    const stubResults = [
      {
        username: 'max',
        type: 'user',
      },
      {
        username: 'lena',
        type: 'administrator',
      },
    ];
    printResults(stubResults);
    expect(mockConsoleLog).toBeCalledWith(chalk.bgGreen(chalk.black('2 results')));
  });

  it('calls console log with concatenated property values', () => {
    const stubResults = [
      {
        username: 'max',
        type: 'user',
      },
    ];
    const expectedPayload = `${chalk.blue('username')}: ${chalk.green('max')}\n${chalk.blue('type')}: ${chalk.green('user')}\n`;
    printResults(stubResults);
    expect(mockConsoleLog).toHaveBeenCalledWith(expectedPayload);
  });

  it('calls console log with comma separated array values', () => {
    const stubResults = [
      {
        username: 'max',
        roles: ['user', 'admin', 'power user', 'owner'],
      },
    ];
    const expectedPayload = `${chalk.blue('username')}: ${chalk.green('max')}\n${chalk.blue('roles')}: ${chalk.green('user,admin,power user,owner')}\n`;
    printResults(stubResults);
    expect(mockConsoleLog).toHaveBeenCalledWith(expectedPayload);
  });
});
