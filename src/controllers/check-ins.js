import {
  getAllCheckIns,
  getCheckInById,
  createCheckIn,
  deleteCheckIn,
} from '../services/check-ins.js';

import { createClient } from '../services/clients.js';
import { updateRoom, getRoomById } from '../services/rooms.js';

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

export const createCheckInClientController = async (req, res) => {
  const {
    last_name,
    first_name,
    middle_name,
    passport_details,
    room,
    check_in_date,
    check_out_date,
    comment,
    note,
  } = req.body;

  const clientData = {
    last_name,
    first_name,
    middle_name,
    passport_details,
    comment,
  };

  const client = await createClient(clientData);

  const clientId = client._id;

  const checkInData = {
    room,
    client: clientId,
    check_in_date,
    check_out_date,
    note,
  };

  const checkIn = await createCheckIn(checkInData);

  const targetedRoom = await getRoomById(room);
  const bookings = targetedRoom.bookings.push({
    check_in_date,
    check_out_date,
  });
  const updatedRoom = await updateRoom(room, bookings);

  res.status(201).json({
    status: 201,
    message: `Successfully created client with check-in and updated room!`,
    data: {
      client,
      checkIn,
      updatedRoom
    },
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
