const { Sequelize } = require('sequelize');

if (process.env.NODE_ENV === 'production') {
    const sequelize = new Sequelize({
        dialect: 'postgres',
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });

    module.exports = sequelize;
    
}

if (process.env.NODE_ENV === 'development') {
    const sequelize = new Sequelize({
        dialect: 'postgres',
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        logging: false,
    });

    module.exports = sequelize;

}