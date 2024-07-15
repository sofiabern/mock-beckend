import { Router } from 'express';

// Controllers
import {
  getAllRoomsController,
  updateRoomController,
} from '../controllers/rooms.js';

// Middlewares
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';
import { validateBody } from '../middlewares/validateBody.js';

// Schemas
import { updateRoomSchema } from '../validation/rooms/updateRoomSchema.js';



export const roomsRouter = Router();

roomsRouter.get('/', ctrlWrapper(getAllRoomsController) );

roomsRouter.patch('/:roomId', validateMongoId('roomId'), validateBody(updateRoomSchema), ctrlWrapper(updateRoomController));
