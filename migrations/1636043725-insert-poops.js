const poops = [
  {
    title: 'Poop at Bahnhof',
    author: 'Robert Kalina',
    latitude: '48.19694',
    longitude: '16.33773',
    img_url: '/images/poopmap.jpg',
    date: '23.12.2014',
  },
  {
    title: 'Big one',
    author: 'Lisa Rath',
    latitude: '48.21174',
    longitude: '16.37706',
    img_url: '/images/poopmap.jpg',
    date: '23.12.2014',
  },
  {
    title: 'Stay away from here',
    author: 'Mex Miser',
    latitude: '48.20071',
    longitude: '16.37016',
    img_url: '/images/poopmap.jpg',
    date: '23.12.2014',
  },
  {
    title: 'Those goddman dogs',
    author: 'Raphael Bader',
    latitude: '48.192528',
    longitude: '16.283246',
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
(title, author, latitude, longitude, img_url, date)
VALUES
(${poop.title}, ${poop.author}, ${poop.latitude}, ${poop.longitude}, ${poop.img_url}, ${poop.date});
  `;
  }
};

// Alternative from postgres via single query:

// This will remove poops from the table
exports.down = async function down(sql) {
  console.log('Deleting the poops from table');
  /* await sql`
	  DELETE FROM
		  poops
		WHERE
		  (title = 'Poop at Bahnhof' AND author = 'Robert Kalina') OR
		  (title = 'Big one' AND author = 'Lisa Rath') OR
		  (title = 'Stay away from here' AND author = 'Mex Miser') OR
		  (title = 'These goddman dogs' AND author = 'Raphael Bader');`; */

  for (const poop of poops) {
    await sql`
	DELETE FROM
	  poops
	WHERE
   title = ${poop.title} AND author = ${poop.author} AND latitude = ${poop.latitude} AND longitude = ${poop.longitude} AND img_url = ${poop.img_url} AND date = ${poop.date}
`;
  }
};

/* exports.up = async function up(sql) {
  console.log('Inserting the poops into table');
  await sql`
    INSERT INTO poops
(title, author, latitude, longitude, img_url, date)
VALUES
('Poop at Bahnhof', 'Robert Kalina', '48.19694', '16.33773', '/images/1.jpg', '23.12.2014'),
('Big one', 'Lisa Rath', '48.21174', '16.37706', '/images/1.jpg', '23.12.2014'),
('Stay away from here', 'Mex Miser', '48.20071', '16.37016', '/images/1.jpg', '23.12.2014'),
('These goddman dogs', 'Raphael Bader', '48.192528', '16.283246', '/images/1.jpg', '23.12.2014');
  `;
}; */
