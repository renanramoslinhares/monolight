var createError = require('http-errors');
var express = require('express');
const { path } = require('../app');
var router = express.Router();

const partials = {
  header: 'include/header',
  footer: 'include/footer',
  navbar: 'components/navbar',
  sidebar: 'components/sidebar',
  search: 'components/search',
};

router.get('/login', function (req, res, next) {
  res.redirect('/login');
});

router.get('/', function (req, res, next) {
  res.redirect('/admin/dashboard');
});

router.get('/dashboard', function (req, res, next) {
  const title = 'Dashboard!';
  const path = 'admin/dashboard';
  res.render(path, { title, partials });
});

router.get('/pages/:param', function (req, res, next) {
  const param = req.params.param;
  var page = {
    all: { title: 'Pages' },
    create: { title: 'Add New Page' },
    attributes: { title: 'Attributes' }
  }[param];
  if(page.title) res.render(`admin/pages/${param}`, { title: page.title, partials });
  else next(createError(404));
});

router.get('/pages', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ teste: 'OK', type: "tudo certo!" }));
  // res.send('Pages'+'<hr />'+req+'<hr />'+res);
});

module.exports = router;