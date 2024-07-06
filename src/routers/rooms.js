import { Router } from 'express';

import {
  getAllRoomsController,
  getRoomByIdController,
  updateRoomController,
} from '../controllers/rooms.js';

import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';

export const roomsRouter = Router();

roomsRouter.get('/rooms', ctrlWrapper(getAllRoomsController) );

roomsRouter.get('/rooms/:roomId', ctrlWrapper(getRoomByIdController));

roomsRouter.patch('/rooms/:roomId', ctrlWrapper(updateRoomController));
