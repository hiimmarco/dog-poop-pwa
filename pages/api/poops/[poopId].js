// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getPoop } from '../../../util/database.ts';

export default async function handler(req, res) {
  const poop = await getPoop(Number(req.query.poopId));
  console.log(Number(req.query.poopId));
  res.status(200).json(poop);
}

// GET => localhost:3000/api/poops => response is poops[]
// GET => localhost:3000/api/poops/:id => response is poop{}

// Path is localhost:3000/api/poops/id
