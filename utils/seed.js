const mongoose = require('mongoose');
const { usersData, thoughtsData, reactionsData } = require('./data');
const User = require('../models/User');
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');

// Define MongoDB connection URI
const MONGODB_URI = 'mongodb://localhost/social_network_db';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Once connected, seed the data
mongoose.connection.once('open', async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});
    await Reaction.deleteMany({});

    // Seed users
    const users = await User.insertMany(usersData);

    // Map user ids to thoughts and reactions
    const userMap = {};
    users.forEach(user => {
      userMap[user.username] = user._id;
    });

    // Seed thoughts
    const thoughts = await Thought.insertMany(thoughtsData.map(thought => ({ ...thought, userId: userMap[thought.username] })));

    // Seed reactions
    await Reaction.insertMany(reactionsData.map(reaction => ({ ...reaction, thoughtId: thoughts[0]._id })));

    console.log('Data successfully seeded into the database.');

    // Close the database connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
  }
});
