const Sequelize = require('sequelize');
const database = require('../db');

const User = database.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.ENUM([
            'Administrator',
            'Editor',
            'Author',
            'Contributor',
            'Subscriber',
            'Super Admin'
        ]),
        allowNull: false
    },
}, {
    indexes: [{
        fields: ['email'],
        unique: true,
    }]
});

module.exports = User;