import express from 'express';
import cors from 'cors';

import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';

import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';

import { getAllRooms, getRoomById } from './services/rooms.js';
import { getAllClients, getClientById } from './services/clients.js';
import { getAllCheckIns, getCheckInById } from './services/check-ins.js';

export const startServer = () => {
  const app = express();

  app.use(cors());

  // Rooms
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

  // Clients
  app.get('/clients', async (req, res) => {
    const clients = await getAllClients();
    res.json({
      status: 200,
      message: 'Successfully got all clients',
      data: clients,
    });
  });

  app.get('/clients/:clientId', async (req, res) => {
    const id = req.params.clientId;
    const client = await getClientById(id);

    if(!client){
      res.json({
        status: 404,
        message: `Client with id ${id} not found`,
        data: null,
      });
      return;
    }

    res.json({
      status: 200,
      message: `Successfully got client with id ${id}`,
      data: client,
    });
  });


  // Check-ins
  app.get('/check-ins', async (req, res) => {
    const checkIns = await getAllCheckIns();
    res.json({
      status: 200,
      message: 'Successfully got all check-ins',
      data: checkIns,
    });
  });

  app.get('/check-ins/:checkInsId', async (req, res) => {
    const id = req.params.checkInsId;
    const checkIn = await getCheckInById(id);

    if(!checkIn){
      res.json({
        status: 404,
        message: `Check-in with id ${id} not found`,
        data: null,
      });
      return;
    }

    res.json({
      status: 200,
      message: `Successfully got check-in with id ${id}`,
      data: checkIn,
    });
  });


  app.use(notFoundMiddleware);

  app.use(errorHandlerMiddleware);

  const PORT = env(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
