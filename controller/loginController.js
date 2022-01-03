var express = require('express');
var router = express.Router();

const partials = {
    header: 'include/header',
    footer: 'include/footer'
};

router.get('/', function(req, res, next) {
    const title = 'Login!';
    const slogan = 'Any Where Press';
    res.render('loginView', { title, slogan, partials });
});

module.exports = router;