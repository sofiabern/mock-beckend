import { CheckIn } from '../db/models/check-ins.js';

export const getAllCheckIns = async () => {

  return await CheckIn.find({})
    .populate('client', 'first_name middle_name last_name')
    .populate('room', 'room_number');
};

export const getCheckInById = async (id) => {
  return await CheckIn.findById(id);
};

export const createCheckIn = async (checkIn) => {
  return await CheckIn.create(checkIn);
};

export const deleteCheckIn = async (id) =>{
  return await CheckIn.findByIdAndDelete(id);
};
