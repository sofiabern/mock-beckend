import { Room } from '../db/models/rooms.js';

export const getAllRooms = async () => {
  return await Room.find({});
};

export const getRoomById = async (id) => {
    return await Room.findById(id);
};
