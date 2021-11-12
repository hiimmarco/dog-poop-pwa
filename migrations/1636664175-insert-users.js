const users = [
  {
    email: 'marcobogner@gmail.com',
    hash_password: '123456',
    user_name: 'Rupert',
    role_id: '2',
  },
  {
    email: 'robertkalina@gmail.com',
    hash_password: '654705',
    user_name: 'Mex',
    role_id: '2',
  },
  {
    email: 'leroy@gmail.com',
    hash_password: 'askudghs',
    user_name: 'Melron',
    role_id: '2',
  },
];

// This will loop over array and insert poops into the table
exports.up = async function up(sql) {
  for (const user of users) {
    await sql`
    INSERT INTO users
(email, hash_password, user_name, role_id)
VALUES
(${user.email}, ${user.hash_password}, ${user.user_name}, ${user.role_id});
  `;
  }
};

// This will remove poops from the table
exports.down = async function down(sql) {
  console.log('Deleting the roles from table');

  for (const user of users) {
    await sql`
	DELETE FROM
	  users
	WHERE
  user_name=${user.user_name}
`;
  }
};
