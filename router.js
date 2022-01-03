const express = require('express');
const router = express.Router();
const path = require('path');
const lessMiddleware = require('less-middleware');

// under development
// use less css
// var logger = require('morgan');

// under development
// app.use(logger('dev'));


// app.use('/img', express.static(__dirname + '/node_modules/bootstrap/dist/'));
// app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/'));

// under development
router.use(lessMiddleware(path.join(__dirname, 'public')));
router.use(express.static(path.join(__dirname, 'public')));

router.use('/sample', express.static(__dirname + '/node_modules/admin-lte/pages'));
router.use('/admin-lte', express.static(__dirname + '/node_modules/admin-lte'));
router.use('/dist', express.static(__dirname + '/node_modules/admin-lte/dist'));

router.use('/admin', require('./router/admin'));
router.use('/login', require('./router/login'));
router.use('/api', require('./router/api'));

module.exports = router;