import { Router } from 'express';

import {
  getAllRoomsController,
  getRoomByIdController,
  updateRoomController,
} from '../controllers/rooms.js';

import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateRoomSchema } from '../validation/rooms/updateRoomSchema.js';
export const roomsRouter = Router();

roomsRouter.use('/rooms/:roomId', validateMongoId('roomId'));

roomsRouter.get('/rooms', ctrlWrapper(getAllRoomsController) );

roomsRouter.get('/rooms/:roomId', ctrlWrapper(getRoomByIdController));

roomsRouter.patch('/rooms/:roomId', validateBody(updateRoomSchema), ctrlWrapper(updateRoomController));
