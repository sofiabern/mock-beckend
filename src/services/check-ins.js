import { CheckIn } from '../db/models/check-ins.js';

const createPaginationInformation = (page, perPage, count) => {
  const totalPages = Math.ceil(count / perPage);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;
  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};

export const getAllCheckIns = async ({ page = 1, perPage = 6 }) => {
  const skip = perPage * (page - 1);

  const [checkInsCount, checkIns] = await Promise.all([
    CheckIn.find().countDocuments(),
    CheckIn.find({})
      .populate('client', 'first_name middle_name last_name')
      .populate('room', 'room_number')
      .skip(skip)
      .limit(perPage),
  ]);

  const paginationInformation = createPaginationInformation(
    page,
    perPage,
    checkInsCount,
  );
  return {
    checkIns,
    ...paginationInformation,
  };
};

// export const getAllCheckIns = async () => {

//   return await CheckIn.find({})
// .populate('client', 'first_name middle_name last_name')
// .populate('room', 'room_number')
// };

export const getCheckInById = async (id) => {
  return await CheckIn.findById(id);
};

export const createCheckIn = async (checkIn) => {
  return await CheckIn.create(checkIn);
};

export const deleteCheckIn = async (id) => {
  return await CheckIn.findByIdAndDelete(id);
};

export const updateCheckIn = async (id, field) => {
  return await CheckIn.findByIdAndUpdate(id, field, { new: true });
};
