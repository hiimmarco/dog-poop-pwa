// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getPoops } from '../../../util/database.js';

export default async function handler(req, res) {
  if (req.method === 'Get') {
    const poops = await getPoops();
    return res.status(200).json(poops);
  } else if (req.method === 'POST') {
    // The code for the post request
  }
  return res.status(405);
}

// GET => localhost:3000/api/poops => response is poops[]
// GET => localhost:3000/api/poops/:id => response is poop{}
