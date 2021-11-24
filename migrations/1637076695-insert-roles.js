const roles = [
  {
    role_name: 'admin',
  },
  {
    role_name: 'user',
  },
];

// This will loop over array and insert poops into the table
exports.up = async function up(sql) {
  for (const role of roles) {
    await sql`
    INSERT INTO roles
(role_name)
VALUES
(${role.role_name});
  `;
  }
};

// This will remove poops from the table
exports.down = async function down(sql) {
  for (const role of roles) {
    await sql`
	DELETE FROM
	  roles
	WHERE
  role_name=${role.role_name}
`;
  }
};
