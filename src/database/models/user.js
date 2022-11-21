'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasMany(models.Following, {
                foreignKey: 'user_id',
            });
        }
    }
    User.init(
        {
            first_name: DataTypes.STRING,
            gender: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'User',
            timestamps: false,
        },
    );
    return User;
};
