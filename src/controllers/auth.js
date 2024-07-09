import { createUser } from '../services/auth.js';
import { loginUser } from '../services/auth.js';
import { refreshSession } from '../services/auth.js';
import { logoutUser } from '../services/auth.js';


const setUpSessionCookies = (res, session) =>{
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: 7 * 24 * 60 * 60,
  });
  res.cookie('sessionToken', session.refreshToken, {
    httpOnly: true,
    expire: 7 * 24 * 60 * 60,
  });
};

export const registerUserController = async (req, res) => {
  const user = await createUser(req.body);

  res.json({
    status: 200,
    message: 'User is created!',
    data: { user },
  });
};

export const loginUserController = async (req, res) =>{
  const session = await loginUser(req.body);

setUpSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'User is logged in!',
    data: { accessToken: session.accessToken },
  });
};

export const refreshTokenController = async (req, res) =>{
const {sessionId, sessionToken} = req.cookies;
const session = await refreshSession({sessionId, sessionToken});


setUpSessionCookies(res, session);

res.json({
  status: 200,
  message: 'Token refreshed successfully',
  data: { accessToken: session.accessToken },
});
};

export const logoutUserController = async (req, res) => {
  await logoutUser({
    sessionId: req.cookies.sessionId,
    sessionToken: req.cookies.sessionToken,
  });

  res.clearCookie('sessionId');
  res.clearCookie('sessionToken');

  res.status(204).send();
};


