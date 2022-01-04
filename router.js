const express = require('express');
const router = express.Router();
const path = require('path');
const lessMiddleware = require('less-middleware');

// under development
// var logger = require('morgan');
// app.use(logger('dev'));

// under development
router.use(lessMiddleware(path.join(__dirname, 'public')));
router.use(express.static(path.join(__dirname, 'public')));

router.use('/admin-lte', express.static(__dirname + '/lib/admin-lte'));

router.use('/admin', require('./controller/adminController'));
router.use('/login', require('./controller/loginController'));
router.use('/api', require('./controller/apiController'));

module.exports = router;