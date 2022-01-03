const express = require('express');
const router = express.Router();
const database = require('../../db');
const pageModel = require('../../models/pageModel.js');

// Create
router.put('/', async function(req, res, next) {
    try {
        await database.sync();
        const data = await pageModel.create(req.body)
        print_success(res, data);
    } catch (error) {
        print_error(res, error);
    }
});

// Read
router.get(['/', '/order/:order'], async function(req, res, next) {
    const arrayOrder = get_order_by(req.params.order);
    console.log('arrayOrder', arrayOrder)

    try {
        database.sync();
        const data = await pageModel.findAll({
            order: [arrayOrder]
        });
        print_success(res, data);
    } catch (error) {
        console.log('Erro!');
        print_error(res, error);
    }
});

router.get('/:id', async function(req, res, next) {
    const id = req.params.id;
    try {
        database.sync();
        const data = await pageModel.findByPk(id);
        print_success(res, data);
    } catch (error) {
        console.log('Erro!');
        print_error(res, error);
    }
});

// Update
router.put('/:id', async function(req, res, next) {
    // under development
    // consult previous status
    // if "publish to trash" or "publish to draft", delete the file
    const id = req.params.id;
    const body = req.body;
    try {
        await database.sync();
        const data = await pageModel.findByPk(id);
        data.update(body);
        const resp = await data.save();
        print_success(res, resp);
    } catch (error) {
        print_error(res, error);
    }
});

// Delete
router.delete('/:id', async function(req, res, next) {
    const id = req.params.id;
    try {
        await database.sync();
        const data = await pageModel.findByPk(id);
        const resp = await data.destroy();
        print_success(res, resp);
    } catch (error) {
        print_error(res, error);
    }
});

async function print_success(res, data) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: 'Success', data: await data }));
}

function print_error(res, error) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: 'Error', error }));
}

function get_order_by(order) {
    let arrayOrder = {
        date: ['updatedAt', 'DESC'],
        title: ['title', 'ASC'],
        author: ['user_name', 'ASC'],
        status: ['status', 'ASC'],
    }[order];

    if (!arrayOrder) arrayOrder = ['updatedAt', 'DESC'];
    return arrayOrder;
}

module.exports = router;