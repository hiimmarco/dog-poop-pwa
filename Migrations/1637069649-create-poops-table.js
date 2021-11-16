// This will create the poops table
exports.up = async function up(sql) {
  await sql`
    CREATE TABLE poops (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
      title VARCHAR(60) NOT NULL,
      description VARCHAR(300) NOT NULL,
      latitude VARCHAR(40) NOT NULL,
      longitude VARCHAR(40) NOT NULL,
      date VARCHAR(40) NOT NULL
    );
  `;
};

// This will remove the poops table
exports.down = async function down(sql) {
  await sql`DROP TABLE poops`;
};
