var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  // res.redirect('/admin/login');
  res.render('exemplo')
  // Provisório
  // Deve apontar para site propriamente dito
});

module.exports = router;
