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

router.get(['/', '/login'], function (req, res, next) {
    res.redirect('/login');
});

router.get(['/', '/dashboard'], function (req, res, next) {
  const title = 'Dashboard!';
  const path = 'admin/dashboard';
  res.render(path, { title, partials });
});

router.get('/pages', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ teste: 'OK', type: "tudo certo!" }));
  // res.send('Pages'+'<hr />'+req+'<hr />'+res);
});

router.get('/pages/create', function (req, res, next) {
  res.send('Pages Create');
});

module.exports = router;