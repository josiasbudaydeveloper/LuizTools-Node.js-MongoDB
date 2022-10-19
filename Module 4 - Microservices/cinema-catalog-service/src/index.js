const server = require('./server/server');
const cinemaCatalog = require('./api/cinema-catalog');
const repository = require('./repository/repository');

(async () => {
  try {
    await server.start(cinemaCatalog, repository);
  }
  catch(err) {
    console.error(err);
}})();