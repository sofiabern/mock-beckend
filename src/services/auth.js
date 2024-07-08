import createHttpError from 'http-errors';
import { User } from '../db/models/users.js';
import { Session } from '../db/models/session.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

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

  const accessToken = crypto.randomBytes(20).toString('base64');
  const refreshToken = crypto.randomBytes(20).toString('base64');

  return await Session.create({
    accessToken,
    refreshToken,
    userId: user._id,
    accessTokenValidUntil: Date.now() + 1000 * 60 * 15,
    refreshTokenValidUntil: Date.now() + 1000 * 60 * 60 * 24 * 7,
  });
};

export const logoutUser = async ({sessionId, sessionToken}) => {
  return await Session.deleteOne({_id: sessionId, refreshToken: sessionToken});
};
