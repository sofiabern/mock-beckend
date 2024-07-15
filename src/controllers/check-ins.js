import {
  getAllCheckIns,
  getCheckInById,
  createCheckIn,
  deleteCheckIn,
  updateCheckIn,
} from '../services/check-ins.js';

import {
  createClient,
  getClient,
  updateClient,
  getClientById,
} from '../services/clients.js';

import { getRoomById, removeBookingFromRoom  } from '../services/rooms.js';


import createHttpError from 'http-errors';

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


export const deleteCheckInController = async (req, res) => {
  const id = req.params.checkInId;

  const checkIn = await getCheckInById(id);
  if (!checkIn) {
    throw createHttpError(404, 'Check-in not found');
  }

  await removeBookingFromRoom(checkIn.room, id);

  const client = await getClientById(checkIn.client);
  if (client && client.visitsAmount > 0) {
    client.visitsAmount -= 1;
    await client.save();
  }

  await deleteCheckIn(id);

  res.status(200).json({
    status: 200,
    message: 'Successfully deleted check-in and booking!',
  });
};

export const updateCheckInController = async (req, res) => {
  const id = req.params.checkInId;
  const updateDate = req.body;

  const checkIn = await updateCheckIn(id, updateDate);

  if (!checkIn) {
    throw createHttpError(505, 'Room not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully updated check-in with id ${id}!`,
    data: {
      checkIn
    }
  });
};

const createClientAndCheckin = async ({
  last_name,
  first_name,
  middle_name,
  passport_details,
  comment,
  discounts,
  totalDiscount,
  room,
  check_in_date,
  check_out_date,
  isCheckIn,
  totalDayPrice,
  totalPrice,
  roomDocument
}) => {
  const clientData = {
    last_name,
    first_name,
    middle_name,
    passport_details,
    comment,
    discounts,
    totalDiscount,
    visitsAmount: 1,
  };

  const client = await createClient(clientData);
  if (!client) {
    throw createHttpError(500, 'Failed to create client');
  }

  const checkInData = {
    room,
    client: client._id,
    check_in_date,
    check_out_date,
    note: comment,
    isCheckIn,
    totalDayPrice,
    totalPrice,
  };

  const checkIn = await createCheckIn(checkInData);

  await addCheckInToRoom(roomDocument, checkIn._id);

  return {
    client,
    checkIn,
  };
};

const createCheckin = async ({
  room,
  client: existingClientId,
  check_in_date,
  check_out_date,
  note,
  isCheckIn,
  totalDayPrice,
  totalPrice,
  discounts,
  totalDiscount,
  roomDocument

}) => {
  const existingClient = await getClient({ _id: existingClientId });
  if (!existingClient) {
    throw createHttpError(404, 'Client not found');
  }

  existingClient.visitsAmount = (existingClient.visitsAmount || 0) + 1;
  await updateClient(existingClient._id, {
    visitsAmount: existingClient.visitsAmount,
    discounts,
    totalDiscount,
  });

  const checkInData = {
    room,
    client: existingClientId,
    check_in_date,
    check_out_date,
    note,
    isCheckIn,
    totalDayPrice,
    totalPrice,
  };

  const checkIn = await createCheckIn(checkInData);

  await addCheckInToRoom(roomDocument, checkIn._id);

  return {
    client: existingClient,
    checkIn,
  };
};

const addCheckInToRoom = async (roomDocument, checkInId) => {
  roomDocument.bookingsAndCheckIns.push(checkInId);
  await roomDocument.save();
};

export const createCheckInController = async (req, res) => {
  const {
    last_name,
    first_name,
    middle_name,
    passport_details,
    room,
    check_in_date,
    check_out_date,
    comment,
    isCheckIn,
    discounts,
    totalDiscount,
    totalDayPrice,
    totalPrice,
  } = req.body;

  const roomDocument = await getRoomById(room);
  if (!roomDocument) {
    throw createHttpError(500, 'Room not found');
  }

  const existingClient = await getClient({ passport_details });

  if (existingClient) {
    try {
      const result = await createCheckin({
        room,
        client: existingClient._id,
        check_in_date,
        check_out_date,
        note: comment,
        isCheckIn,
        totalDayPrice,
        totalPrice,
        discounts,
        totalDiscount,
        roomDocument

      });
      return res.status(200).json({
        status: 200,
        message: 'Client with this passport number has visited hotel',
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  } else {
    try {
      const result = await createClientAndCheckin({
        last_name,
        first_name,
        middle_name,
        passport_details,
        comment,
        discounts,
        totalDiscount,
        room,
        check_in_date,
        check_out_date,
        isCheckIn,
        totalDayPrice,
        totalPrice,
        roomDocument

      });
      return res.status(201).json({
        status: 201,
        message: 'Created check-in and client, and updated room',
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }
};