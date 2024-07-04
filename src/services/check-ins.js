import { CheckIn } from '../db/models/check-ins.js';

export const getAllCheckIns = async () => {
  return await CheckIn.find({}).populate('client', "middle_name");
};

export const getCheckInById = async (id) => {
    return await CheckIn.findById(id);
};

export const createCheckIn = async (checkIn) => {
  return await CheckIn.create(checkIn);
};
