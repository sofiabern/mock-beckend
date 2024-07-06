import express from 'express';
import cors from 'cors';

import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';

import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';

import { roomsRouter } from './routers/rooms.js';
import { clientsRouter } from './routers/clients.js';
import { checkInsRouter } from './routers/check-ins.js';

export const startServer = () => {
  const app = express();

  app.use(express.json());

  app.use(cors());

  // Rooms
  app.use(roomsRouter);

  // Clients
  app.use(clientsRouter);

  // Check-ins
  app.use(checkInsRouter);

//   app.post('/clients-test', (req, res) =>{
// res.send("hello");
//   });

  app.use(notFoundMiddleware);

  app.use(errorHandlerMiddleware);

  const PORT = env(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
