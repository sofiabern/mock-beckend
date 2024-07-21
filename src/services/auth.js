import createHttpError from 'http-errors';
import { User } from '../db/models/users.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const {JWT_SECRET} = process.env;


export const createUser = async (payload) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw createHttpError(
      409,
      'User with this email is already present in database!',
    );
  }

  return await User.create({ ...payload, password: hashedPassword });
};


export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const areEqual = await bcrypt.compare(password, user.password);

  if (!areEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  const{_id: id} = user;
  const payload = {
    id
  };

  const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "3m"});
await User.findByIdAndUpdate(id, {token});
  return token;
};


export const logoutUser = async (id, field) => {
  return await User.findByIdAndUpdate(id, field);
};
