const Sequelize = require('sequelize');

// Initialize a new Sequelize instance with SQLite as the database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

module.exports = sequelize;