'use strict';

const fs = require('fs');
const csv = require('csv-parser');
const stripBom = require('strip-bom-stream');

const results = [];

const extractDataFromCsv = new Promise((resolve, reject) => {
    fs.createReadStream('../name_gender_dataset.csv')
        .pipe(stripBom())
        .pipe(csv(['first_name', 'gender']))
        .on('data', data => results.push(data))
        .on('end', () => {
            resolve(results);
        });
});

function getCountOfFollowings() {
    return Math.floor(Math.random() * 150);
}

function generateFollowingsForUser(count, userId) {
    const randoms = [];
    for (let i = 0; i < count; i++) {
        let number = Math.floor(Math.random() * (200 - 1) + 1);
        while (randoms.includes(number) || number === userId) {
            number = Math.floor(Math.random() * (200 - 1) + 1);
        }
        randoms.push(number);
    }
    return randoms;
}

function generateAllFollowings() {
    const followings = [];
    for (let i = 1; i < 201; i++) {
        const count = getCountOfFollowings();
        const userFollowings = generateFollowingsForUser(count, i);
        for (let j = 0; j < userFollowings.length; j++) {
            followings.push({
                user_id: i,
                following: userFollowings[j],
            });
        }
    }
    return followings;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const users = await extractDataFromCsv;
        await queryInterface.bulkInsert('Users', users);

        const folllowings = generateAllFollowings();
        await queryInterface.bulkInsert('Followings', folllowings);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Followings', null);
        await queryInterface.bulkDelete('Users', null);
    },
};
