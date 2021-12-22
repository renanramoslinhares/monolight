var express = require('express');
var router = express.Router();

const partials = {
  header: 'include/header',
  footer: 'include/footer'
};

router.get('/', function (req, res, next) {
    const title = 'Login!';
    const slogan = 'Any Where Press';
    const path = 'login';
    res.render(path, { title, slogan, partials });
});

module.exports = router;