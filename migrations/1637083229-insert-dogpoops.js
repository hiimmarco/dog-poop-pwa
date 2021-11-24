const poops = [
  {
    author_id: 3,
    title: 'Poops at Westbahnhof',
    description: `It's right next to the entrance, be careful.`,
    latitude: 48.197351,
    longitude: 16.338273,
    date: '21.11.2021',
  },
  {
    author_id: 1,
    title: 'Big one',
    description:
      'There must have been a big dog around the Schwedenplatz. Wow!',
    latitude: 48.21174,
    longitude: 16.37706,
    date: '23.11.2021',
  },
  {
    author_id: 3,
    title: 'Stay away from here',
    description: 'Horrible. Just horrible.',
    latitude: 48.20071,
    longitude: 16.37016,
    date: '23.11.2021',
  },
  {
    author_id: 4,
    title: 'Those goddman dogs',
    description:
      'Just ran into one over here at the OBI store. Need to get some new shoes I think.',
    latitude: 48.192528,
    longitude: 16.283246,
    date: '29.11.2021',
  },
];

// This will loop over array and insert poops into the table
exports.up = async function up(sql) {
  for (const poop of poops) {
    await sql`
    INSERT INTO poops
(author_id, title, description, latitude, longitude, date)
VALUES
(${poop.author_id}, ${poop.title}, ${poop.description}, ${poop.latitude}, ${poop.longitude}, ${poop.date});
  `;
  }
};

// This will remove poops from the table
exports.down = async function down(sql) {
  for (const poop of poops) {
    await sql`
	DELETE FROM
	  poops
	WHERE
   author_id = ${poop.author_id} AND title = ${poop.title} AND description=${poop.description} AND latitude = ${poop.latitude} AND longitude = ${poop.longitude} AND date = ${poop.date}
`;
  }
};
