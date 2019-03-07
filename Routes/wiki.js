const express = require('express');
const router = express.Router();
const html = require('../views/addPage.js');
const { Page } = require('../models')

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
        console.log(save.dataValues);
        res.redirect('/');
    } catch (error) {
        next(error)
    }
});

router.get('/add', (req, res) => {
    res.send(html());
});


module.exports = router;
