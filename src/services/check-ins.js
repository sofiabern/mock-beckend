import { CheckIn } from '../db/models/check-ins.js';

export const getAllCheckIns = async () => {
  return await CheckIn.find({});
};

export const getCheckInById = async (id) => {
    return await CheckIn.findById(id);
};
