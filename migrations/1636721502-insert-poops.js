const poops = [
  {
    title: 'Poop at Bahnhof',
    description: 'Hey man, this is a big one.',
    author: 'Robert Kalina',
    latitude: 48.19694,
    longitude: 16.33773,
    img_url: '/images/poopmap.jpg',
    date: '23.12.2014',
  },
  {
    title: 'Big one',
    description: 'Hey man, this is a big one.',
    author: 'Lisa Rath',
    latitude: 48.21174,
    longitude: 16.37706,
    img_url: '/images/poopmap.jpg',
    date: '23.12.2014',
  },
  {
    title: 'Stay away from here',
    description: 'Hey man, this is a big one.',
    author: 'Mex Miser',
    latitude: 48.20071,
    longitude: 16.37016,
    img_url: '/images/poopmap.jpg',
    date: '23.12.2014',
  },
  {
    title: 'Those goddman dogs',
    description: 'Hey man, this is a big one.',
    author: 'Raphael Bader',
    latitude: 48.192528,
    longitude: 16.283246,
    img_url: '/images/poopmap.jpg',
    date: '23.12.2014',
  },
];

// This will loop over array and insert poops into the table
exports.up = async function up(sql) {
  console.log('Inserting the poops into table');

  for (const poop of poops) {
    await sql`
    INSERT INTO poops
(title, description, author, latitude, longitude, img_url, date)
VALUES
(${poop.title}, ${poop.description}, ${poop.author}, ${poop.latitude}, ${poop.longitude}, ${poop.img_url}, ${poop.date});
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
   title = ${poop.title} AND description=${poop.description} AND author = ${poop.author} AND latitude = ${poop.latitude} AND longitude = ${poop.longitude} AND img_url = ${poop.img_url} AND date = ${poop.date}
`;
  }
};
