const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(
    'mangaWeb',
    'root',
    null,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);

const ConnectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection Database successfully.');
    } catch (error) {
        console.error('Connection Database Error:', error);
    }
}

module.exports = ConnectDb;