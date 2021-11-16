import { NextApiRequest, NextApiResponse } from 'next';

export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log(req.body);
  res.send(null);
}
