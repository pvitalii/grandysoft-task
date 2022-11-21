'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            first_name: {
                type: Sequelize.STRING,
            },
            gender: {
                type: Sequelize.STRING,
            },
        });
        await queryInterface.createTable('Followings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: 'Users', key: 'id' },
            },
            following: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: 'Users', key: 'id' },
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropAllTables();
    },
};
