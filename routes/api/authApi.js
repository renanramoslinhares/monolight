const express = require('express');
const router = express.Router();
const database = require('../../db');
const userModel = require('../../models/userModel.js');

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

// Auth
router.post('/', async function(req, res, next) {
    try {
        await database.sync();
        const data = await userModel.findOne({ where: { email: req.body.email } })
        if (data && await bcrypt.compare(req.body.password, data.password)) {
            delete data.dataValues['password'];
            var token = jwt.sign(
                data.dataValues,
                'Any-Where-Press', // under development
                { expiresIn: '1h' }
            );
            print_success(res, { token, dataUser: data.dataValues });
        } else {
            res.status(401);
            print_error(res, { message: 'Authentication failed' });
        }
    } catch (error) {
        res.status(401);
        print_error(res, error);
    }
});

// Create Example
// under development
router.put('/createUser', async function(req, res, next) {
    bcrypt.hash(req.body.password, 10, async function(err, hash) {
        // await userModel.sync({ force: true });
        // under development
        req.body.password = hash;
        try {
            await database.sync();
            const data = await userModel.create(req.body)
            print_success(res, data);
        } catch (error) {
            const messages = error.errors.map((elmentError) => elmentError.message);
            print_error(res, { message: messages })
        }
    });
});

async function print_success(res, data) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: 'Success', data: await data }));
}

function print_error(res, error) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: 'Error', error }));
}

module.exports = router;