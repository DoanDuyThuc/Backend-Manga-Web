require('dotenv').config();
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    timeZone: '+07:00',
    define: {
      freezeTableName: true
    }
  },
  test: {
    username: "root",
    password: null,
    database: "mangaWeb",
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      freezeTableName: true
    }
  },
  production: {
    username: "root",
    password: null,
    database: "mangaWeb",
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      freezeTableName: true
    }
  }
};