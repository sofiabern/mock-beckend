import { Client } from '../db/models/clients.js';

const createPaginationInformation = (page, perPage, count) => {
  const totalPages = Math.ceil(count/perPage);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;
  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};

export const getAllClients = async ({ page = 1, perPage = 6 }) => {
  const skip = perPage * (page - 1);

  const [clientsCount, clients] = await Promise.all([Client.find().countDocuments(), Client.find({}).skip(skip).limit(perPage)]);

  const paginationInformation = createPaginationInformation(
    page,
    perPage,
    clientsCount,
  );
  return {
    clients,
    ...paginationInformation,
  };
};

export const getClientById = async (id) => {
  return await Client.findById(id);
};

export const getClient = async (field) =>{
return await Client.findOne(field);
};

export const createClient = async (client) => {
  return await Client.create(client);
};

export const updateClient = async(id, field) =>{
  return await Client.findByIdAndUpdate(id, field, { new: true });
};
