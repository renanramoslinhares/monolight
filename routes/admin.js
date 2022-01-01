var express = require('express');
const router = express.Router();

router.use('/page', require('./admin/pageAdmin'));

const partials = {
    header: 'include/header',
    footer: 'include/footer',
    navbarComponent: 'components/navbarComponent',
    sidebarComponent: 'components/sidebarComponent',
    searchComponent: 'components/searchComponent',
};

router.get('/login', function(req, res, next) {
    res.redirect('/login');
});

router.get('/', function(req, res, next) {
    // res.redirect('/admin/dashboard');
    res.redirect('/admin/page');
    // under development
});

router.get('/dashboard', function(req, res, next) {
    const title = 'Dashboard!';
    const path = 'admin/dashboardView';
    res.render(path, { title, partials });
});

module.exports = router;