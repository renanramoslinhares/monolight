const createError = require('http-errors');
const express = require('express');
const https = require('http');
const router = express.Router();

const moment = require('moment');
moment.locale('in');

const partials = {
    header: 'include/header',
    footer: 'include/footer',
    navbarComponent: 'components/navbarComponent',
    sidebarComponent: 'components/sidebarComponent',
    searchComponent: 'components/searchComponent',
};

router.get('/', function(req, res, next) {
    res.redirect('/admin/page/all');
});

router.get(['/all', '/all/:order'], async function(req, res, next) {
    const order = req.params.order;
    const data = await getAllPageData(order);
    res.render(`admin/page/allPageView`, { title: 'All Pages', data, partials });
});

router.get('/create', async function(req, res, next) {
    const data = { parentList: await getAllPageData() };
    res.render(`admin/page/createPageView`, { title: 'Add New Page', data, partials });
});

router.get('/edit/:id', async function(req, res, next) {
    const pageId = req.params.id;
    const data = await getPageData(pageId);

    data['parentList'] = await getAllPageData().then((resp) => {
        resp.filter((element) => element.id != pageId)
    });

    res.render(`admin/page/createPageView`, { title: 'Edit Page', data, partials });
});

// Functions //

function getAllPageData(order = 'date') {

    const getColor = (status) => ({
        Draft: 'primary',
        Publish: 'success',
        Trash: 'danger'
    }[status]);

    const req = request({ url: `/api/page/order/${order}` })
        .then(resp => resp.map(element => ({
            id: element.id,
            title: element.title,
            author: element.user_name,
            status: {
                name: element.status,
                color: getColor(element.status)
            },
            date: moment(element.updatedAt).format('L H:mm')
                // an hour ago ...
                // under development
        })));
    return req;
}

function getPageData(id) {
    return request({ url: `/api/page/${id}` })
        .then(element => ({
            id: element.id,
            title: element.title,
            content: element.content,
            author: element.user_name,
            status: element.status,
            parent: element.parent,
            order: element.order,
            featuredImageUrl: element.featuredImageUrl,
            permalink: element.permalink,
            createdAt: element.createdAt,
            updatedAt: element.updatedAt,
        }));
}

function request(params) {
    return new Promise((resolve, reject) => {
        // Backend
        // under development
        const backend = "http://localhost:3000";

        https.get(`${backend}${params.url}`, res => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            return res.on('end', () => {
                try { resolve(JSON.parse(rawData).data); } catch (error) { reject({ error }); }
            });
        }).on('error', (error) => {
            reject({ error });
            alert(`Got error: ${error.message}`);
        });
    });
}

module.exports = router;