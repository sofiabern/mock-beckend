import { getAllClients, getClientById, createClient} from "../services/clients.js";

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


  export const createClientController = async (req, res) => {
    const { body } = req;
    const client = await createClient(body);

    res.status(201).json({
      status: 201,
      message: `Successfully created client!`,
      data: client,
    });
  };
