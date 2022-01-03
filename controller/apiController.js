var express = require('express');
const router = express.Router();

router.use('/page', require('./api/pageApiController'));
router.use('/auth', require('./api/authApiController'));
router.use('/fileService', require('./api/fileApiController'));

module.exports = router;