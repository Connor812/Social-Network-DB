// Import connection
const connection = require('../config/connection');
// Import models
const { User, Thought } = require('../models');
// Import data
const { users, thoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete data in models
  await User.deleteMany({});
  await Thought.deleteMany({});
// Insert the data into collections
  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  // Displays seeded data
  console.table(User);
  console.table(Thought);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});