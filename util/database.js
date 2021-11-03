import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

// Read in the .env environment variables in the file to connect to postgres
dotenvSafe.config();

// Connect to postgres
const sql = postgres();

export async function getPoops() {
  const poops = await sql`
  SELECT * FROM poops;
  `;
  return poops.map((poop) => {
    return camelcaseKeys(poop);
  });
}

export const poops = [
  {
    id: '1',
    title: 'Poop at Schwedenplatz',
    author: 'Max',
    img: 'url',
    date: '23.12.2014',
    location: {
      lat: '',
      lon: '',
    },
  },
  {
    id: '2',
    title: 'Bad one on mahü',
    author: 'Marian',
    img: 'url',
    date: '25.53.3968',
    location: {
      lat: '',
      lon: '',
    },
  },
  {
    id: '3',
    title: 'Why in front of my car',
    author: 'Robert',
    img: 'url',
    date: '12.12.1212',
    location: {
      lat: '',
      lon: '',
    },
  },
  {
    id: '4',
    title: 'Seems to be a big dog',
    author: 'Manfred',
    img: 'url',
    date: 234,
    location: {
      lat: '',
      lon: '',
    },
  },
];
