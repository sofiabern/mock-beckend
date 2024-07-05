import { Room } from '../db/models/rooms.js';

export const getAllRooms = async () => {
  return await Room.find();
};

export const getRoomById = async (id) => {
    return await Room.findById(id);
};

export const updateRoom = async (id,  updateData) =>{
  return await Room.findByIdAndUpdate(id, updateData, { new: true });
};

export const filterRooms = async (checkInDate, checkOutDate) => {
  return await Room.find({
    bookings: {
      $not: {
        $elemMatch: {
          $or: [
            { check_in_date: { $lt: new Date(checkOutDate) } },
            { check_out_date: { $gt: new Date(checkInDate) } }
          ]
        }
      }
    }
  });
};
