import { Sequelize } from 'sequelize';
import fs from 'fs';

// Initialize a new Sequelize instance with SQLite as the database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: (msg) => {
    // Write the SQL statement to a file
    fs.appendFileSync('sequelize.log', `${msg}\n`);
  }
});

export default sequelize;