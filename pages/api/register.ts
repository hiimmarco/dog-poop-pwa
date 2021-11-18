import crypto from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '../../util/auth';
import { createSerializedRegisterSessionTokenCookie } from '../../util/cookies';
import {
  createSession,
  getUserWithPasswordHashByUsername,
  insertUser,
  User,
} from '../../util/database';
import { Errors } from '../../util/types';

export type RegisterResponse = { errors: Errors } | { user: User };

export type RegisterRequest = { username: string; password: string };

export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponse>,
) {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.status(400).send({
      errors: [
        { message: 'Request must contain username, email and password.' },
      ],
    });
    return;
  }
  try {
    const username = req.body.username;

    const existingUser = await getUserWithPasswordHashByUsername(username);

    if (existingUser) {
      res.status(400).send({
        errors: [{ message: 'Username already exists' }],
      });
      return;
    }
    const email = req.body.email;
    const passwordHash = await hashPassword(req.body.password);
    const roleId = req.body.roleId;
    const user = await insertUser({ username, email, passwordHash, roleId });

    // clean old sessions
    // deleteExpiredSessions();

    if (!user) {
      res.status(500).send({ errors: [{ message: 'User not create' }] });
      return;
    }

    // Create the record in the sessions table with a new token

    // 1. create the token
    const token = crypto.randomBytes(64).toString('base64');

    // 2. do a DB query to add the session record
    const newSession = await createSession(token, user.id);

    // set the response to create the cookie in the browser

    const cookie = createSerializedRegisterSessionTokenCookie(newSession.token);

    res.status(200).setHeader('set-Cookie', cookie).send({ user: user });
  } catch (err) {
    res.status(500).send({
      errors: [
        {
          message: 'Username already exists. Please choose another username.',
        },
      ],
    });
  }
}
