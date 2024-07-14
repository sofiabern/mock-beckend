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

import { getRoomById } from '../services/rooms.js';

import { removeBookingFromRoom } from '../services/rooms.js';

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
    isCheckIn,
    discounts,
    totalDiscount,
    totalDayPrice,
    totalPrice
  } = req.body;

  const existingClient = await getClient({ passport_details });

  if (existingClient) {
    const existingClientId = existingClient._id;

    const checkInData = {
      room,
      client: existingClientId,
      check_in_date,
      check_out_date,
      note: comment,
      isCheckIn,
      totalDayPrice,
      totalPrice
    };


    existingClient.visitsAmount = (existingClient.visitsAmount || 0) + 1;
    await updateClient(existingClient._id, {
      visitsAmount: existingClient.visitsAmount,
      discounts, totalDiscount
    });



    const checkIn = await createCheckIn(checkInData);

    const roomDocument = await getRoomById(room);
    if (!roomDocument) {
      throw createHttpError(500, 'Room not found');
    }

    roomDocument.bookingsAndCheckIns.push(checkIn._id);

    await roomDocument.save();

    return res.status(200).json({
      status: 200,
      message: 'Created check-in, and updated client and room',
      data: {
        checkIn: checkIn,

      },
    });
  } else {


    const clientData = {
      last_name,
      first_name,
      middle_name,
      passport_details,
      comment,
      visitsAmount: 1,
      discounts,
      totalDiscount,
    };

    const client = await createClient(clientData);

    const clientId = client._id;


    const checkInData = {
      room,
      client: clientId,
      check_in_date,
      check_out_date,
      note: comment,
      isCheckIn,
      totalDayPrice,
      totalPrice
    };

    const checkIn = await createCheckIn(checkInData);

    const roomDocument = await getRoomById(room);
    if (!roomDocument) {
      throw createHttpError(500, 'Room not found');
    }

    roomDocument.bookingsAndCheckIns.push(checkIn._id);

    await roomDocument.save();

    res.status(201).json({
      status: 201,
      message: `Created check-in and client, and updated room`,
      data: {
        checkIn: checkIn,
  
      },
    });
  }
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
    throw createHttpError(404, 'Room not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully updated check-in with id ${id}!`,
    data: checkIn,
  });
};
