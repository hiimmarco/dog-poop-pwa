import { getUserById } from '../../../util/database';

export default async function handler(req, res) {
  const user = await getUserById(Number(req.query.userId));
  console.log(Number(req.query.userId));
  res.status(200).json(user);
}
