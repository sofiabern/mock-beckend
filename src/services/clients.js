import { Client } from '../db/models/clients.js';

export const getAllClients = async () => {
  return await Client.find({});
};

export const getClientById = async (id) => {
    return await Client.findById(id);
};

export const createClient = async (client) => {
  return await Client.create(client);
};
