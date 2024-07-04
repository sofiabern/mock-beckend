import {
  getAllCheckIns,
  getCheckInById,
  createCheckIn,
  deleteCheckIn,
} from '../services/check-ins.js';

export const getAllCheckInsController = async (req, res) => {
  const checkIns = await getAllCheckIns();
  res.json({
    status: 200,
    message: 'Successfully got all check-ins!',
    data: checkIns,
  });
};

export const getCheckInByIdController = async (req, res) => {
  const id = req.params.checkInId;
  const checkIn = await getCheckInById(id);

  res.json({
    status: 200,
    message: `Successfully got check-in with id ${id}!`,
    data: checkIn,
  });
};

export const createCheckInController = async (req, res) => {
  const { body } = req;
  const checkIn = await createCheckIn(body);

  res.status(201).json({
    status: 201,
    message: `Successfully created check-in!`,
    data: checkIn,
  });
};

export const deleteCheckInController = async (req, res) => {
  const id = req.params.checkInId;
  await deleteCheckIn(id);
  res.status(200).json({
    status: 200,
    message: 'Successfully deleted check-in!',
  });
};
