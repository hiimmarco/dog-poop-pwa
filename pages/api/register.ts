import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '../../util/auth';
import { insertUser, User } from '../../util/database';
import { Errors } from '../../util/types';

export type RegisterResponse = { errors: Errors } | { user: User };

export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse,
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
    const email = req.body.email;
    const passwordHash = await hashPassword(req.body.password);
    const roleId = req.body.roleId;
    const user = await insertUser({ username, email, passwordHash, roleId });
    res.send({ user: user });
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
