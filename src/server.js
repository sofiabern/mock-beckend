import express from 'express';
import cors from 'cors';

import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';

import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';

import { getAllRooms, getRoomById } from './services/rooms.js';

export const startServer = () => {
  const app = express();

  app.use(cors());

  app.get('/rooms', async (req, res) => {
    const rooms = await getAllRooms();
    res.json({
      status: 200,
      message: 'Successfully got all rooms',
      data: rooms,
    });
  });

  app.get('/rooms/:roomId', async (req, res) => {
    const id = req.params.roomId;
    const room = await getRoomById(id);

    if(!room){
      res.json({
        status: 404,
        message: `Room with id ${id} not found`,
        data: null,
      });
      return;
    }

    res.json({
      status: 200,
      message: `Successfully got room with id ${id}`,
      data: room,
    });
  });

  app.use(notFoundMiddleware);

  app.use(errorHandlerMiddleware);

  const PORT = env(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
