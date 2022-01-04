var createError = require('http-errors');
var express = require('express');
const router = express.Router();

router.use('/page', require('./admin/pageAdminController'));

// under development
// repeated in adminController and pageAdminController
const partials = {
    header: 'include/header',
    footer: 'include/footer',
    navbarComponent: 'components/navbarComponent',
    sidebarComponent: 'components/sidebarComponent',
    searchComponent: 'components/searchComponent',
    navigatorComponent: 'components/navigatorComponent',
    actionSelectComponent: 'components/actionSelectComponent',
    allPageTableComponent: 'components/allPageTableComponent',
    breadcrumbComponent: 'components/breadcrumbComponent',
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
    const path = 'pages/dashboardView';
    res.render(path, { title, partials });
});

module.exports = router;