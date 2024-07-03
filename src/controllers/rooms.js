import { getAllRooms, getRoomById } from "../services/rooms.js";

export const getAllRoomsController = async (req, res) => {
    const rooms = await getAllRooms();
    res.json({
      status: 200,
      message: 'Successfully got all rooms',
      data: rooms,
    });
  };

  export const getRoomByIdController = async (req, res) => {
    const id = req.params.roomId;
    const room = await getRoomById(id);

    if(!room){
      res.json({
        status: 404,
        message: `Room with id ${id} not found`,
        data: null,
      });
      return;
    }

    res.json({
      status: 200,
      message: `Successfully got room with id ${id}`,
      data: room,
    });
  };
