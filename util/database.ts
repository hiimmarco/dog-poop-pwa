import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

export type Poops = {
  id: number;
  author_id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  date: string;
};

export type User = {
  id: number;
  user_name: string;
  email: string;
  roleId: number;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export type Session = {
  id: number;
  token: string;
  userId: number;
  expiryTimestamp: Date;
};

// Type needed for the connection function below
declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}
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
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }

  return sql;
}

// Read in the .env environment variables in the file to connect to postgres
dotenvSafe.config();

// Connect to postgres
const sql = connectOneTimeToDatabase();

export async function getPoops() {
  const poops = await sql<Poops[]>`
  SELECT * FROM poops;
  `;
  return poops.map((poop) => {
    return camelcaseKeys(poop);
  });
}

// Get only one poop by its ID
export async function getPoop(id: number) {
  const poops = await sql<Poops[]>`
  SELECT
    *
  FROM
    poops
  WHERE
    id = ${id}
  `;
  return camelcaseKeys(poops[0]);
}

// Get only one poop by its ID

export async function getPoopById(id: number) {
  // Return undefined if userId is not parseable
  // to an integer
  if (!id) return undefined;

  const poops = await sql`
    SELECT
      *
    FROM
      poops
    WHERE
      id = ${id}
  `;
  return poops.map((poop) => camelcaseKeys(poop))[0];
}

export async function createPoop({
  author_id,
  title,
  description,
  latitude,
  longitude,
  date,
}: {
  author_id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  date: string;
}) {
  const poops = await sql`
  INSERT INTO poops
    (author_id, title, description, latitude, longitude, date)
  VALUES
    (${author_id}, ${title}, ${description}, ${latitude}, ${longitude}, ${date})
    RETURNING
      id,
      title;
  `;
  return camelcaseKeys(poops[0]);
}

// Get only one user by its ID
export async function getUser(id: number) {
  const [user] = await sql<[User]>`
  SELECT
    id,
    user_name,
    role_id
  FROM
    users
  WHERE
    id = ${id}
  `;
  return camelcaseKeys(user);
}

export async function getUserById(id: number) {
  // Return undefined if userId is not parseable
  // to an integer
  if (!id) return undefined;

  const poops = await sql`
    SELECT
     id,
     user_name,
     role_id
    FROM
      users
    WHERE
      id = ${id}
  `;
  return poops.map((poop) => camelcaseKeys(poop))[0];
}

// Get user with password hash
export async function getUserWithPasswordHashByUsername(username: string) {
  const [user] = await sql<[UserWithPasswordHash | undefined]>`
  SELECT
    id,
    user_name,
    role_id,
    password_hash
  FROM
    users
  WHERE
    user_name = ${username}
  `;
  return user && camelcaseKeys(user);
}

export async function insertUser({
  username,
  email,
  passwordHash,
  roleId,
}: {
  username: string;
  email: string;
  passwordHash: string;
  roleId: number;
}) {
  const newUser = await sql<User[]>`
  INSERT INTO users
    (user_name, password_hash, email, role_id)
  VALUES
    (${username}, ${passwordHash}, ${email}, ${roleId})
  RETURNING
    id,
    user_name,
    role_id
  `;
  return camelcaseKeys(newUser[0]);
}

// Query to get all the poops added by a specific user
export async function getPoopsByUserId(userId: number) {
  const poops = await sql<Poops[]>`
  SELECT
    poops.id,
    poops.title,
    poops.latitude,
    poops.longitude,
    poops.date
  FROM
    users,
    poops
  WHERE
    users.id = ${userId} AND
    poops.author_id = userId
  `;
  return poops.map((poop) => camelcaseKeys(poop));
}
