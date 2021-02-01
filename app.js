const { init } = require('./modules/home/homeModule.js');
const createSearchableCollection = require('./indexedSearch/createSearchableCollection');
const users = require('./data/users.json');
const tickets = require('./data/tickets.json');
const organizations = require('./data/organizations.json');

(async () => {
  const searchableCollections = {
    users: createSearchableCollection(users),
    tickets: createSearchableCollection(tickets),
    organizations: createSearchableCollection(organizations),
  };
  try {
    await init(searchableCollections);
  } catch (ex) {
    console.log('Something went wrong, exception: ', ex);
  }
})();
