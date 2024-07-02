import { startServer } from './server.js';
import { initMongoCOnnection } from './db/initMongoConnection.js';

(async () => {
  await initMongoCOnnection();
  startServer();
})();
