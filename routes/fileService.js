const express = require('express');
const router = express.Router();
const fs = require('fs');

const database = require('../db');
const pageModel = require('../models/pageModel.js');

router.put('/create/:fileName', async function(req, res, next) {
    const fileName = req.params.fileName;
    const html = `<html><body><h1>${req.body.title}</h1>${req.body.content}</body></html>`
    fs.appendFile(`public/${fileName}.html`, html, function(err) {
        if (err) throw err;
        console.log('Saved!');
    });
    // try {
    //     await database.sync();
    //     const data = await pageModel.create(req.body)
    print_success(res, { fileName });
    // } catch (error) {
    //     print_error(res, error);
    // }
});

router.delete('/delete/:pageId', async function(req, res, next) {
    await database.sync();
    const fileName = await pageModel.findByPk(req.params.pageId).then(resp => resp.dataValues.permalink)
    fs.access(`public/${fileName}.html`, fs.constants.F_OK, (error => {
        if (!error) fs.unlinkSync(`public/${fileName}.html`);
    }));
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