const {
  Sequelize
} = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(process.env.DB_DATABASE_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
  logging: false,
  timeZone: '+07:00'
});
const ConnectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection Database successfully.');
  } catch (error) {
    console.error('Connection Database Error:', error);
  }
};
module.exports = ConnectDb;