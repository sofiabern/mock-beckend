import express from 'express';
import cors from 'cors';

import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';

export const startServer = () => {
  const app = express();

  app.use(cors());

  app.get('/', (req, res, next) => {
    res.send('Hello world');
  });

  app.post('/', (req, res, next) => {
    console.log(req.body);
  });

  const PORT = env(ENV_VARS.PORT, 3000);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
