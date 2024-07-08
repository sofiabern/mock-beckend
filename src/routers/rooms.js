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

roomsRouter.use('/:roomId', validateMongoId('roomId'));

roomsRouter.get('/', ctrlWrapper(getAllRoomsController) );

roomsRouter.get('/:roomId', validateMongoId('roomId'), ctrlWrapper(getRoomByIdController));

roomsRouter.patch('/:roomId', validateMongoId('roomId'), validateBody(updateRoomSchema), ctrlWrapper(updateRoomController));
