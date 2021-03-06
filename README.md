## What is Dog Poop?

Dog Poop is a mobile first web application that lets you easily report dog poop on sidewalks and provides an overview of all reported dog poop in Vienna.

## Technologies used

- Next.js
- PostgreSQL
- [TailwindCSS](https://tailwindcss.com/)
- [Progressive Web App](https://web.dev/progressive-web-apps/)
- [Google Maps](https://developers.google.com/maps/documentation/javascript/overview) Dynamic & Static Maps & Places API
- [Workbox](https://developers.google.com/web/tools/workbox) Library for Service Workers

## Design

- Clean
- Friendly
- Funny
- Playful

Figma Style Guide: https://www.figma.com/file/qVtgugn4RDncim0GY7YMer/Dog-Poop-Style-Guide


## Database Setup

Database diagram: https://drawsql.app/me-134/diagrams/dog-poop

<img width="764" alt="database-diagram" src="https://user-images.githubusercontent.com/25134498/143601905-ebc70755-bd09-497b-b372-0995d4cf2c47.png">

Copy the `.env.example` file to a new file called `.env` (ignored from Git) and fill in the necessary information.

Follow the instructions from the PostgreSQL step in [UpLeveled's System Setup Instructions](https://github.com/upleveled/system-setup/blob/master/readme.md).

Then, connect to the built-in `postgres` database as administrator in order to create the database:

**Windows**

If it asks for a password, use `postgres`.

```sh
psql -U postgres
```

**macOS**

```sh
psql postgres
```

Once you have connected, run the following to create the database:

```sql
CREATE DATABASE <database name>;
CREATE USER <user name> WITH ENCRYPTED PASSWORD '<user password>';
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
```

Then, to connect to the database using this new user, quit `psql` and reconnect:

```sh
\q
psql -U <user name> <database name>
```

### Running the migrations

To set up the structure and the content of the database, run the migrations using Ley:

```sh
yarn migrate up
```

To reverse the last single migration, run:

```sh
yarn migrate down
```

## API Design

Base URL (development): http://localhost:3000/api/

1. Reading all poops: `GET /poops`
2. Reading a single poop: `GET /poops/:id`
3. Creating a new poop: `POST /poops`
4. Updating a user: `PUT /poops/:id`
5. Deleting a poop: `DELETE /poops/:id`
