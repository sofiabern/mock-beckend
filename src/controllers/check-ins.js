import { getAllCheckIns, getCheckInById } from "../services/check-ins.js";


export const getAllCheckInsController =  async (req, res) => {
    const checkIns = await getAllCheckIns();
    res.json({
      status: 200,
      message: 'Successfully got all check-ins',
      data: checkIns,
    });
  };

  export const getCheckInByIdController = async (req, res) => {
    const id = req.params.checkInId;
    const checkIn = await getCheckInById(id);

    if (!checkIn) {
      res.json({
        status: 404,
        message: `Check-in with id ${id} not found`,
        data: null,
      });
      return;
    }

    res.json({
      status: 200,
      message: `Successfully got check-in with id ${id}`,
      data: checkIn,
    });
  };
