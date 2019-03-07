const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage.js');
const wikiPage = require('../views/wikipage.js');
const { Page, User } = require('../models');


router.get('/', (req, res) => {
    res.redirect('/');
    //res.send('');
});

router.post('/', async (req, res, next) => {
    
    try {
        let [ user ] = await User.findOrCreate( {where: {name: req.body.author}, defaults: {email: req.body.email}})
        console.log(user);
        const page = new Page({
            title: req.body.title,
            content: req.body.content,
            authorId: user.id
        });
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
        // const author = await pageContent[0].getOwner();
        console.log(pageContent[0]);
        res.send(wikiPage(pageContent[0]));
    } catch (error) {
        next(error);
    }
});

module.exports = router;
