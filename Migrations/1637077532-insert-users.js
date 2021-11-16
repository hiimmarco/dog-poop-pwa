const users = [
  {
    user_name: 'Manfredo',
    password_hash:
      '$2b$10$Nra68NN7jcoMbx9edq5Oi.U8Ym8sMxp9bDfcWp3JCXhEc7MNVNvZ2',
    email: 'testmail@example.com',
    role_id: 2,
    poop_id: 3,
  },
  {
    user_name: 'Marco',
    password_hash:
      '$2b$10$W7s0rgVMjOxWQ2fxQ/cZ5.s0dLCK0tNdh0sKDf/CVmj3qQA3D8NnS',
    email: 'testmail@example.com',
    role_id: 1,
    poop_id: null,
  },
  {
    user_name: 'Lisa',
    password_hash:
      '$2b$10$W7s0rgVMjOxWQ2fxQ/cZ5.s0dLCK0tNdh0sKDf/CVmj3qQA3D8NnS',
    email: 'testmail@example.com',
    role_id: 2,
    poop_id: 1,
  },
  {
    user_name: 'Esteban',
    password_hash:
      '$2b$10$W7s0rgVMjOxWQ2fxQ/cZ5.s0dLCK0tNdh0sKDf/CVmj3qQA3D8NnS',
    email: 'testmail@example.com',
    role_id: 2,
    poop_id: 2,
  },
];

exports.up = async function up(sql) {
  for (const user of users) {
    await sql`
      INSERT INTO users
        (user_name, password_hash, email, role_id, poop_id)
      VALUES
        (${user.user_name}, ${user.password_hash}, ${user.email}, ${user.role_id}, ${user.poop_id});
    `;
  }
};

exports.down = async function down(sql) {
  for (const user of users) {
    await sql`
      DELETE FROM
        users
      WHERE
        user_name = ${user.user_name} AND password_hash = ${user.password_hash};
    `;
  }
};
