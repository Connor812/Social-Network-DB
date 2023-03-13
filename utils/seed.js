// Import connection
const connection = require('../config/connection');
// Import models
const { User, Video } = require('../models');
// Import data
const { getRandomName, getRandomVideos } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete data in models
  await NameOfCollection.deleteMany({});

// Insert the data into collections
  await NameOfCollection.collection.insertMany(Data);

  // Displays seeded data
  console.table(NameOfCollection);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});d