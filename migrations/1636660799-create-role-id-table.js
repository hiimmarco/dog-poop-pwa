// This will create roles table
exports.up = async function up(sql) {
  await sql`
    CREATE TABLE roles (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
      role_name VARCHAR(40) NOT NULL
    );
  `;
};

// This will remove the roles table
exports.down = async function up(sql) {
  await sql`DROP TABLE roles`;
};
