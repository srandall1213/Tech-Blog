const seedUsers = require('./userData');
const seedPosts = require('./postData');
const seedComments = require('./commentData');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
    console.log('\nDATABASE SYNCED 🗄️ ✅');

  await seedUsers();
    console.log('\nUSERS SEEDED 😀 🌱');

  await seedPosts();
    console.log('\nPOSTS SEEDED 📬 🌱');

  await seedComments();
    console.log('\nCOMMENTS SEEDED ✍️ 🌱');

  process.exit(0);
};

seedAll();