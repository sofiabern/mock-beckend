import {
  getAllCheckIns,
  getCheckInById,
  createCheckIn,
  deleteCheckIn,
} from '../services/check-ins.js';

import { createClient } from '../services/clients.js';

import { getRoomById } from '../services/rooms.js';

import { removeBookingFromRoom } from '../services/rooms.js';

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

  const roomDocument = await getRoomById(room);
  if (!roomDocument) {
    return res.status(404).json({ message: 'Room not found' });
  }

  const bookingData = {
    check_in_date,
    check_out_date,
  };

  roomDocument.bookings.push(bookingData);
  await roomDocument.save();
  const bookingId = roomDocument.bookings[roomDocument.bookings.length - 1]._id;

  const checkInData = {
    room,
    client: clientId,
    check_in_date,
    check_out_date,
    note,
    booking: bookingId,
  };

  const checkIn = await createCheckIn(checkInData);

  res.status(201).json({
    status: 201,
    message: `Successfully created client with check-in!`,
    data: {
      client: client,
      checkIn: checkIn,
    },
  });
};

export const deleteCheckInController = async (req, res) => {
  const id = req.params.checkInId;

  const checkIn = getCheckInById(id);
  if (!checkIn) {
    return res.status(404).json({ message: 'Check-in not found' });
  }

  await removeBookingFromRoom(checkIn.room, checkIn.booking);

  await deleteCheckIn(id);

  res.status(200).json({
    status: 200,
    message: 'Successfully deleted check-in and booking!',
  });
};
