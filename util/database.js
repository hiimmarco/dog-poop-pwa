import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production') {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.__postgresSqlClient) {
      globalThis.__postgresSqlClient = postgres();
    }
    sql = globalThis.__postgresSqlClient;
  }

  return sql;
}

// Read in the .env environment variables in the file to connect to postgres
dotenvSafe.config();

// Connect to postgres
const sql = connectOneTimeToDatabase();

export async function getPoops() {
  const poops = await sql`
  SELECT * FROM poops;
  `;
  return poops.map((poop) => {
    return camelcaseKeys(poop);
  });
}

export async function getPoop(id) {
  const poops = await sql`
  SELECT
    *
  FROM
    poops
  WHERE
    id = ${id}
  `;
  return camelcaseKeys(poops[0]);
}

// Query to get all the poops added by a specific user
export async function getPoopsByUserId(userId) {
  const poops = await sql`
  SELECT
    poops.id,
    poops.title,
    poops.latitude,
    poops.longitude,
    poops.img_url,
    poops.date
  FROM
    users,
    poops
  WHERE
    users.id = ${userId} AND
    poops.author_id = users.id
  `;
  return poops.map((poop) => camelcaseKeys(poop));
}
