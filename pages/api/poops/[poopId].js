// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { deletePoopById } from '../../../util/database';
import { getPoop } from '../../../util/database.ts';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const poops = await getPoop(Number(req.query.poopId));
    return res.status(200).json(poops);
  } else if (req.method === 'DELETE') {
    const deletedUser = await deletePoopById(Number(req.query.poopId));
    return res.status(200).json(deletedUser);
  }
  return res.status(405);
}

// GET => localhost:3000/api/poops => response is poops[]
// GET => localhost:3000/api/poops/:id => response is poop{}

// Path is localhost:3000/api/poops/id
