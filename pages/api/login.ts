import crypto from 'node:crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyPassword } from '../../util/auth';
import {
  createSession,
  getUserWithPasswordHashByUsername,
  User,
} from '../../util/database';
import { Errors } from '../../util/types';

export type LoginResponse = { errors: Errors } | { user: User };

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      errors: [{ message: 'Request must contain username and password.' }],
    });
    return;
  }
  try {
    const username = req.body.username;

    const userWithPasswordHash = await getUserWithPasswordHashByUsername(
      username,
    );

    // Username doesn't match database
    if (!userWithPasswordHash) {
      res.status(401).send({
        errors: [{ message: 'Username or password not correct.' }],
      });
      return;
    }

    const isPasswordVerified = verifyPassword(
      req.body.password,
      userWithPasswordHash.passwordHash,
    );

    // Password doesn't match database
    if (!isPasswordVerified) {
      res.status(401).send({
        errors: [{ message: 'Username or password not correct.' }],
      });
      return;
    }

    // Create the record in the session table with a token:
    // 1. Create a token
    const token = crypto.randomBytes(64).toString('base64');
    // 2. Add the session record to the DB via a query
    const newSession = await createSession(token, userWithPasswordHash.id);
    // 3. Set the response to create the cookie in the browser

    asdfasdf;

    const { passwordHash, ...user } = userWithPasswordHash;

    res.send({ user: user });
  } catch (err) {
    res.status(500).send({
      errors: [
        {
          message: (err as Error).message,
        },
      ],
    });
  }
}
