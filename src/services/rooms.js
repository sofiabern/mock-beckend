import { Room } from '../db/models/rooms.js';
import createHttpError from 'http-errors';

export const getAllRooms = async () => {
  return await Room.find();
};

export const getRoomById = async (id) => {
    return await Room.findById(id);
};

export const updateRoom = async (id,  updateData) =>{
  return await Room.findByIdAndUpdate(id, updateData, { new: true });
};

export const removeBookingFromRoom = async (roomId, bookingId) => {
  const room = await Room.findById(roomId);
  if (!room) {
    throw createHttpError(404, 'Room not found');

  }

  room.bookings = room.bookings.filter(booking => booking._id.toString() !== bookingId.toString());
  await room.save();
};


