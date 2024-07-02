import { Client } from '../db/models/client.js';

export const getAllClients = async () => {
  return await Client.find({});
};

export const getClientById = async (id) => {
    return await Client.findById(id);
};
