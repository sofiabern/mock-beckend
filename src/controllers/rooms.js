import { getAllRooms, getRoomById, updateRoom, filterRooms } from '../services/rooms.js';

export const getAllRoomsController = async (req, res) => {
  const rooms = await getAllRooms();
  res.json({
    status: 200,
    message: 'Successfully got all rooms!',
    data: rooms,
  });
};

export const getRoomByIdController = async (req, res) => {
  const id = req.params.roomId;
  const room = await getRoomById(id);

  res.json({
    status: 200,
    message: `Successfully got room with id ${id}!`,
    data: room,
  });
};

export const updateRoomController = async (req, res) => {
  const id = req.params.roomId;
  const updateData = req.body;
  const room = await updateRoom(id, updateData);

  if (!room) {
    return res.status(404).json({
      status: 404,
      message: 'Room not found',
    });
  }

  res.status(200).json({
    status: 200,
    message: `Successfully updated room with id ${id}!`,
    data: room,
  });
};

export const filterRoomsController = async (req, res) => {
  const { check_in_date, check_out_date } = req.body;

  const rooms = await filterRooms(check_in_date, check_out_date);

  res.json({
    status: 200,
    message: 'Successfully fetched filtered rooms!',
    data: rooms,
  });
};
