
import {
  getAllClients,
  getClientById,
  getClient,
} from '../services/clients.js';
// import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getAllClientsController = async (req, res) => {
  // const { page, perPage } = parsePaginationParams(req.query);

  // const clients = await getAllClients({ page, perPage });
  const clients = await getAllClients();
  res.json({
    status: 200,
    message: 'Successfully got all clients!',
    data: clients,
  });
};

export const getClientByIdController = async (req, res) => {
  const id = req.params.clientId;
  const client = await getClientById(id);

  res.json({
    status: 200,
    message: `Successfully got client with id ${id}!`,
    data: client,
  });
};


export const getClientVisitsController = async (req, res) => {
 const {passport_details} = req.body;

  const client = await getClient({ passport_details });

  let visitsAmount;

  if (!client) {
    visitsAmount = 0;
    return res.json({
      status: 200,
      message: `Client with passport number ${passport_details} has never visited hotel`,
      data: visitsAmount,
    });
  }

  visitsAmount = client.visitsAmount;

  res.json({
    status: 200,
    message: `Successfully got client's visits with passport number ${passport_details}!`,
    data: visitsAmount,
  });
};
