import {
  getAllClients,
  getClientById,
  getClient,
  createClient,
  updateClient,
} from '../services/clients.js';
import { parsePaginationParams } from '../utils/parsеPaginationParams.js';

export const getAllClientsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const clients = await getAllClients({ page, perPage });
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

export const createClientController = async (req, res) => {
  const { body } = req;
  const { passport_details, isCheckIn } = body;

  const existingClient = await getClient({ passport_details });

  if (existingClient) {
    if (isCheckIn) {
      existingClient.visitsAmount = (existingClient.visitsAmount || 0) + 1;
      await updateClient(existingClient._id, {
        visitsAmount: existingClient.visitsAmount,
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Client with this passport number already exists!',
      data: existingClient,
    });
  }

  const client = await createClient(body);
  if (isCheckIn) {
    client.visitsAmount = 1;
    await client.save();
  }

  res.status(201).json({
    status: 201,
    message: 'Successfully created client!',
    data: client,
  });
};
