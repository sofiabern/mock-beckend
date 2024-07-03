import { getAllClients, getClientById } from "../services/clients.js";

export const getAllClientsController = async (req, res) => {
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
