import {
  getAllCheckIns,
  getCheckInById,
  createCheckIn,
  deleteCheckIn,
} from '../services/check-ins.js';

import { createClient } from '../services/clients.js';

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

  const { last_name, first_name, middle_name, passport_details, room, check_in_date, check_out_date, comment, note } = req.body;

  const clientData = {
    last_name,
    first_name,
    middle_name,
    passport_details,
    comment: comment
  };

  const client = await createClient(clientData);

  const clientId = client._id;

  const checkInData = {
    room,
    client: clientId,
    check_in_date,
    check_out_date,
    note: note
  };

  const checkIn = await createCheckIn(checkInData);

  res.status(201).json({
    status: 201,
    message: `Successfully created client with check-in!`,
    data: {
    client: client,
    checkIn: checkIn
  }
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
