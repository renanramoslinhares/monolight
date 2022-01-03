const express = require('express');
const router = express.Router();
const fs = require('fs');

const database = require('../../db');
const pageModel = require('../../models/pageModel.js');

router.put('/create/:fileName', async function(req, res, next) {
    const fileName = req.params.fileName;
    const html = `<html><body><h1>${req.body.title}</h1>${req.body.content}</body></html>`
    fs.appendFile(`public/${fileName}.html`, html, function(err) {
        if (err) throw err;
        console.log('Saved!');
    });

    print_success(res, { fileName });
});

router.delete('/delete/:pageId', async function(req, res, next) {
    await database.sync();
    const fileName = await pageModel.findByPk(req.params.pageId).then(resp => resp.dataValues.permalink)
    fs.access(`public/${fileName}.html`, fs.constants.F_OK, (error => {
        if (!error) {
            fs.unlinkSync(`public/${fileName}.html`);
            res.end(JSON.stringify({ status: 'Success', data: { message: 'Successfully deleted!' } }));
        } else { res.end(JSON.stringify({ status: 'Error', data: { message: 'Could not find the file!' } })) };
    }));
});

async function print_success(res, data) {
    // under development
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: 'Success', data: await data }));
}

function print_error(res, error) {
    // under development
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: 'Error', error }));
}

module.exports = router;