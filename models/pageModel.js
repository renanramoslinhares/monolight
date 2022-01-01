const Sequelize = require('sequelize');
const database = require('../db');

const Page = database.define('page', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    user_name: Sequelize.STRING,
    content: Sequelize.STRING,
    status: {
        type: Sequelize.ENUM([
            'Publish',
            'Future',
            'Draft',
            'Pending',
            'Private',
            'Trash',
            'Auto-Draft',
            'Inherit'
        ])
    },
    parent: Sequelize.STRING,
    order: Sequelize.INTEGER,
    featuredImageUrl: Sequelize.STRING,
    permalink: Sequelize.STRING,
});

module.exports = Page;