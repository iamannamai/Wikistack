const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage.js');
const wikiPage = require('../views/wikipage.js');
const { Page } = require('../models');

router.get('/', (req, res) => {
    res.redirect('/');
    //res.send('');
});

router.post('/', async (req, res, next) => {
    const page = new Page({
        title: req.body.title,
        content: req.body.content
    });

    try {
        let save = await page.save();
        res.redirect(`/wiki/${save.slug}`);
    } catch (error) {
        next(error);
    }
});

router.get('/add', (req, res) => {
    res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
    try {
        const pageContent = await Page.findAll({
            where: {
                slug: req.params.slug
            }
        });
        console.log(pageContent[0]);
        res.send(wikiPage(pageContent[0]));
    } catch (error) {
        next(error);
    }
});

module.exports = router;
