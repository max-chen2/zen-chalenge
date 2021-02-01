const prompts = require('prompts');
const searchZendeskModule = require('../searchZendeskModule');
const searchWithQuery = require('../searchWithQuery');

jest.mock('../searchWithQuery');
searchWithQuery.mockReturnValue([]);
jest.mock('prompts');

describe('searchZendeskModule', () => {
  const stubSearchableCollection = {
    abc: { collection: [] },
  };
  describe('init', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('does not search if no entity is selected', async () => {
      prompts.mockResolvedValue({ value: '' });
      await searchZendeskModule.init(stubSearchableCollection);
      expect(searchWithQuery).not.toBeCalled();
    });

    it('calls searchWithQuery if value provided for all prompts', async () => {
      prompts.mockResolvedValue({ value: 'abc' });
      await searchZendeskModule.init(stubSearchableCollection);
      expect(searchWithQuery).toBeCalled();
    });
  });
});
