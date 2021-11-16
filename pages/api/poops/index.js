// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { createPoop, getPoops } from '../../../util/database.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const poops = await getPoops();
    console.log(poops);
    return res.status(200).json(poops);
  } else if (req.method === 'POST') {
    // The code for the post request
    const body = req.body;
    console.log('from post', body);
    const createdPoop = await createPoop({
      title: body.poopTitle,
      description: body.poopDescription,
      latitude: body.poopLatitude,
      longitude: body.poopLongitude,
      date: body.poopDate,
    });
    return res.status(200).json(createdPoop);
  }
  return res.status(405);
}

// GET => localhost:3000/api/poops => response is poops[]
// GET => localhost:3000/api/poops/:id => response is poop{}

// path is localhoast:3000/api/poops
