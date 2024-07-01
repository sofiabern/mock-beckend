import dotenv from 'dotenv';

dotenv.config();

export const env = (envName, defaultValue) => {
  if (process.env[envName]) return process.env[envName];
  if (defaultValue) return defaultValue;

  throw new Error(`Env variable with name ${envName} not found`);
};
