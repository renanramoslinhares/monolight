var express = require('express');
const { path } = require('../app');
var router = express.Router();

const partials = {
  header: 'include/header',
  footer: 'include/footer',
  navbar: 'components/navbar',
  sidebar: 'components/sidebar',
};

router.get(['/', '/login'], function (req, res, next) {
    const title = 'Login!';
    const path = 'admin/login';
    res.render(path, { title, partials });
});

router.get('/dashboard', function (req, res, next) {
  const title = 'Dashboard!';
  const path = 'admin/dashboard';
  res.render(path, { title, partials });
});

router.get('/pages', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ teste: 'OK', type: "tudo certo!" }))
  // console.log('req', req)
  // console.log('res', res)
  // res.render('admin/dashboard', { title: 'Dashboard!' });
  // req = JSON.stringify(req);
  // res.send('Pages'+'<hr />'+req+'<hr />'+res);
});

router.get('/pages/create', function (req, res, next) {
  // res.render('admin/dashboard', { title: 'Dashboard!' });
  res.send('Pages Create');
});

module.exports = router;


// app.route('/book')
//   .get(function(req, res) {
//     res.send('Get a random book');
//   })
//   .post(function(req, res) {
//     res.send('Add a book');
//   })
//   .put(function(req, res) {
//     res.send('Update the book');
//   });