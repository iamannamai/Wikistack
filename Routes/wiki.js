const express = require('express');
const router = express.Router();
const { addPage, wikiPage } = require('../views');
const { Page, User } = require('../models');

router.get('/', (req, res) => {
  res.redirect('/');
  //res.send('');
});

router.post('/', async (req, res, next) => {
  try {
    let [user] = await User.findOrCreate({
      where: {
        name: req.body.author,
        email: req.body.email
      }
      // defaults: {
      //     email: req.body.email
      // }
    });
    // const page = new Page({
    //     title: req.body.title,
    //     content: req.body.content,
    //     // authorId: user.id
    // });
    // let save = await page.save();
    const page = await Page.create(req.body);
    page.setAuthor(user);
    res.redirect(`/wiki/${page.slug}`); //save.slug
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
      },
      include: [
        {
          model: User,
          as: 'author'
        }
      ]
    });

    if (pageContent.length === 0) {
      res.status(404).send('404 Page Not Found');
    }

    res.send(wikiPage(pageContent[0], pageContent[0].author.name));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
