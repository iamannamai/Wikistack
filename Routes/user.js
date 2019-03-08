const express = require('express');
const router = express.Router();
const { User, Page } = require('../models');
const { userList, userPages } = require('../views');

router.get('/', async (req, res, next) => {
  try {
    let users = await User.findAll();
    res.send(userList(users));
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    let authorId = Number(req.params.id);
    let articles = await Page.findAll({
      where: { authorId: authorId },
      include: [
        {
          model: User,
          as: 'author',
          // where: {
          //   id: authorId
          // }
        }
      ]
    });
    res.send(userPages(articles[0].author, articles));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
