var express = require('express');
const router = express.Router();

router.use('/page', require('./api/pageApi'));
router.use('/auth', require('./api/authApi'));

module.exports = router;